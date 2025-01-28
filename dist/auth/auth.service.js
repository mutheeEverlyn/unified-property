"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const zod_1 = require("zod");
const drizzle_orm_1 = require("drizzle-orm");
const registrationSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.enum(["admin", "user", "userAdminRoleAuth"]).optional(),
});
const createAuthUserService = async (user) => {
    const parsedData = registrationSchema.parse(user);
    const userRecord = await db_1.default.insert(schema_1.usersTable).values({
        full_name: parsedData.full_name,
        email: parsedData.email,
        contact_phone: parsedData.contact_phone,
        address: parsedData.address,
        role: parsedData.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }).returning({ user_id: schema_1.usersTable.user_id });
    const user_id = userRecord[0]?.user_id;
    if (!user_id)
        return null;
    await db_1.default.insert(schema_1.AuthOnUsersTable).values({
        user_id: user_id,
        password: parsedData.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });
    return user_id;
};
exports.createAuthUserService = createAuthUserService;
const userLoginService = async (user) => {
    const { email, password } = user;
    return await db_1.default.query.usersTable.findFirst({
        columns: {
            user_id: true,
            email: true,
            full_name: true,
            role: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.usersTable.email} = ${email}`,
        with: {
            user: {
                columns: {
                    password: true
                }
            }
        }
    });
};
exports.userLoginService = userLoginService;
