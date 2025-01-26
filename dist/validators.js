"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    address: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
