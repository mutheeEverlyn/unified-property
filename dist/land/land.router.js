"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landRouter = void 0;
const hono_1 = require("hono");
const land_controller_1 = require("./land.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.landRouter = new hono_1.Hono();
exports.landRouter.get("/land", bearAuth_1.userAdminRoleAuth, land_controller_1.listLand);
exports.landRouter.get("/landData", bearAuth_1.userAdminRoleAuth, land_controller_1.land);
exports.landRouter.get("/land/:id", bearAuth_1.userAdminRoleAuth, land_controller_1.getLand);
exports.landRouter.post("/land", (0, zod_validator_1.zValidator)('json', validators_1.landSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, land_controller_1.createLand);
exports.landRouter.put("/land/:id", bearAuth_1.userAdminRoleAuth, land_controller_1.updateLand);
exports.landRouter.delete("/land/:id", bearAuth_1.adminRoleAuth, land_controller_1.deleteLand);
