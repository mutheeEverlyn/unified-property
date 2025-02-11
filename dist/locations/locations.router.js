"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const locations_controller_1 = require("./locations.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.locationRouter = new hono_1.Hono();
exports.locationRouter.get("/location", bearAuth_1.userAdminRoleAuth, locations_controller_1.listLocation);
exports.locationRouter.get("/locationData", bearAuth_1.userAdminRoleAuth, locations_controller_1.location);
exports.locationRouter.get("/location/:id", bearAuth_1.userAdminRoleAuth, locations_controller_1.getLocation);
exports.locationRouter.post("/location", (0, zod_validator_1.zValidator)('json', validators_1.locationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, locations_controller_1.createLocation);
exports.locationRouter.put("/location/:id", bearAuth_1.userAdminRoleAuth, locations_controller_1.updateLocation);
exports.locationRouter.delete("/location/:id", bearAuth_1.adminRoleAuth, locations_controller_1.deleteLocation);
