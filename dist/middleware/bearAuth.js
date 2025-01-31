"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAdminRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
//authentication middleware
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//authorization middleware
const authMiddleware = async (c, next, requiredRole) => {
    const token = c.req.header("Authorization");
    if (!token)
        return c.json({ error: "token not provided" }, 401);
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decoded)
        return c.json({ error: "invalid{ token" }, 401);
    if (requiredRole === "userAdminRoleAuth") {
        if (decoded.role === "admin" || decoded.role === "user") {
            c.req.user = decoded;
            return next();
        }
    }
    else if (decoded.role == requiredRole) {
        c.req.user = decoded;
        return next();
    }
    return c.json({ error: "unauthorized" }, 401);
};
exports.authMiddleware = authMiddleware;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
const userAdminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "userAdminRoleAuth");
exports.userAdminRoleAuth = userAdminRoleAuth;
