"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const user_controller_1 = require("./user.controller");
const bearAuth_1 = require("../middleware/bearAuth");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.userRouter = new hono_1.Hono();
exports.userRouter.get("/users", bearAuth_1.userAdminRoleAuth, user_controller_1.listUsers);
exports.userRouter.get("/users/:id", bearAuth_1.userAdminRoleAuth, user_controller_1.getUser);
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)('json', validators_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userAdminRoleAuth, user_controller_1.createUser);
exports.userRouter.put("/users/:id", bearAuth_1.userAdminRoleAuth, user_controller_1.updateUser);
exports.userRouter.delete("/users/:id", bearAuth_1.adminRoleAuth, user_controller_1.deleteUser);
