"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const assert_1 = __importDefault(require("assert"));
(0, assert_1.default)(process.env.JWT_SECRET);
const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        console.log(user);
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        const userId = await (0, auth_service_1.createAuthUserService)(user);
        console.log(userId);
        if (!userId)
            return c.text("User not created", 404);
        return c.json({ msg: 'User created successfully' }, 201);
    }
    catch (error) {
        console.error("Error during registration:", error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        const { email, password } = await c.req.json();
        const userExist = await (0, auth_service_1.userLoginService)({ email, password });
        if (!userExist)
            return c.json({ error: 'User not found' }, 404);
        const userMatch = await bcrypt_1.default.compare(password, userExist?.user.password);
        if (!userMatch) {
            return c.json({ error: 'Invalid details' }, 401);
        }
        else {
            const payload = {
                sub: userExist?.email,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 1800), // 30 hours session expiration
            };
            const secret = process.env.JWT_SECRET;
            const token = await (0, jwt_1.sign)(payload, secret);
            const responseInfo = {
                token,
                user: {
                    user_id: userExist?.user_id,
                    role: userExist?.role,
                    full_name: userExist?.full_name,
                    email: userExist?.email,
                }
            };
            return c.json(responseInfo, 200);
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
