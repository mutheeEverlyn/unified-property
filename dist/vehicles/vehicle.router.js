"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicle_controller_1 = require("./vehicle.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.vehicleRouter = new hono_1.Hono();
exports.vehicleRouter.get("/vehicles", bearAuth_1.userAdminRoleAuth, vehicle_controller_1.listVehicles);
exports.vehicleRouter.get("/vehiclesData", bearAuth_1.userAdminRoleAuth, vehicle_controller_1.vehicles);
exports.vehicleRouter.get("/vehicles/:id", bearAuth_1.userAdminRoleAuth, vehicle_controller_1.getVehicles);
exports.vehicleRouter.post("/vehicles", (0, zod_validator_1.zValidator)('json', validators_1.vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, vehicle_controller_1.createVehicles);
exports.vehicleRouter.put("/vehicles/:id", bearAuth_1.userAdminRoleAuth, vehicle_controller_1.updateVehicles);
exports.vehicleRouter.delete("/vehicles/:id", bearAuth_1.adminRoleAuth, vehicle_controller_1.deleteVehicles);
