"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicles = exports.updateVehicles = exports.createVehicles = exports.vehicles = exports.getVehicles = exports.listVehicles = void 0;
const vehicle_service_1 = require("./vehicle.service");
const listVehicles = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicle_service_1.vehiclesService)(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicles not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listVehicles = listVehicles;
const getVehicles = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicles = await (0, vehicle_service_1.getVehiclesService)(id);
    if (vehicles == undefined) {
        return c.text("vehicles not found", 404);
    }
    return c.json(vehicles, 200);
};
exports.getVehicles = getVehicles;
// data
const vehicles = async (c) => {
    try {
        const data = await (0, vehicle_service_1.vehiclesData)();
        if (data == null || data.length == 0) {
            return c.text("vehicles not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.vehicles = vehicles;
const createVehicles = async (c) => {
    try {
        const vehicles = await c.req.json();
        const createdVehicles = await (0, vehicle_service_1.createVehiclesService)(vehicles);
        if (!createdVehicles)
            return c.text("vehicles not created", 404);
        return c.json({ msg: createdVehicles }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicles = createVehicles;
const updateVehicles = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicles = await c.req.json();
    try {
        const searchedVehicles = await (0, vehicle_service_1.getVehiclesService)(id);
        if (searchedVehicles == undefined)
            return c.text("vehicles not found", 404);
        // get the data and update it
        const res = await (0, vehicle_service_1.updateVehiclesService)(id, vehicles);
        if (!res)
            return c.text("vehicles not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicles = updateVehicles;
const deleteVehicles = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const vehicles = await (0, vehicle_service_1.getVehiclesService)(id);
        if (vehicles == undefined)
            return c.text("vehicles not found", 404);
        const res = await (0, vehicle_service_1.deleteVehiclesService)(id);
        if (!res)
            return c.text("vehicles not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicles = deleteVehicles;
