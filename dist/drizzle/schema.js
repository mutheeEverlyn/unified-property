"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOnUsersRelations = exports.AuthOnUsersTable = exports.usersTable = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "userAdminRoleAuth"]);
// Users Table
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    user_id: (0, pg_core_1.serial)("user_id").primaryKey(),
    full_name: (0, pg_core_1.text)("full_name"),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).unique(),
    contact_phone: (0, pg_core_1.text)("contact_phone"),
    address: (0, pg_core_1.text)("address"),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Authentication Table
exports.AuthOnUsersTable = (0, pg_core_1.pgTable)("auth_on_users", {
    auth_id: (0, pg_core_1.serial)("auth_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    password: (0, pg_core_1.varchar)("password", { length: 100 }),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
exports.AuthOnUsersRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ one }) => ({
    user: one(exports.AuthOnUsersTable, {
        fields: [exports.usersTable.user_id],
        references: [exports.AuthOnUsersTable.user_id]
    })
}));
