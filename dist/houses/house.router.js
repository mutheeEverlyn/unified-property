"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseRouter = void 0;
const hono_1 = require("hono");
const house_controller_1 = require("./house.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.houseRouter = new hono_1.Hono();
exports.houseRouter.get("/house", bearAuth_1.userAdminRoleAuth, house_controller_1.listHouse);
exports.houseRouter.get("/houseData", bearAuth_1.userAdminRoleAuth, house_controller_1.house);
exports.houseRouter.get("/house/:id", bearAuth_1.userAdminRoleAuth, house_controller_1.getHouse);
exports.houseRouter.post("/house", (0, zod_validator_1.zValidator)('json', validators_1.houseSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, house_controller_1.createHouse);
exports.houseRouter.put("/house/:id", bearAuth_1.adminRoleAuth, house_controller_1.updateHouse);
exports.houseRouter.delete("/house/:id", bearAuth_1.adminRoleAuth, house_controller_1.deleteHouse);
