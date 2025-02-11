"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.location = exports.getLocation = exports.listLocation = void 0;
const locations_service_1 = require("./locations.service");
const listLocation = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, locations_service_1.locationService)(limit);
        if (data == null || data.length == 0) {
            return c.text("location not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listLocation = listLocation;
const getLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const location = await (0, locations_service_1.getLocationService)(id);
    if (location == undefined) {
        return c.text("location not found", 404);
    }
    return c.json(location, 200);
};
exports.getLocation = getLocation;
// data
const location = async (c) => {
    try {
        const data = await (0, locations_service_1.locationData)();
        if (data == null || data.length == 0) {
            return c.text("location not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.location = location;
const createLocation = async (c) => {
    try {
        const location = await c.req.json();
        const createdLocation = await (0, locations_service_1.createLocationService)(location);
        if (!createdLocation)
            return c.text("location not created", 404);
        return c.json({ msg: createdLocation }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLocation = createLocation;
const updateLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const location = await c.req.json();
    try {
        const searchedLocation = await (0, locations_service_1.getLocationService)(id);
        if (searchedLocation == undefined)
            return c.text("location not found", 404);
        // get the data and update it
        const res = await (0, locations_service_1.updateLocationService)(id, location);
        if (!res)
            return c.text("location not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLocation = updateLocation;
const deleteLocation = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const location = await (0, locations_service_1.getLocationService)(id);
        if (location == undefined)
            return c.text("location not found", 404);
        const res = await (0, locations_service_1.deleteLocationService)(id);
        if (!res)
            return c.text("location not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocation = deleteLocation;
