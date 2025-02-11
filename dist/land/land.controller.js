"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLand = exports.updateLand = exports.createLand = exports.land = exports.getLand = exports.listLand = void 0;
const land_service_1 = require("./land.service");
const listLand = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, land_service_1.landService)(limit);
        if (data == null || data.length == 0) {
            return c.text("land not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listLand = listLand;
const getLand = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const land = await (0, land_service_1.getLandService)(id);
    if (land == undefined) {
        return c.text("land not found", 404);
    }
    return c.json(land, 200);
};
exports.getLand = getLand;
// data
const land = async (c) => {
    try {
        const data = await (0, land_service_1.landData)();
        if (data == null || data.length == 0) {
            return c.text("land not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.land = land;
const createLand = async (c) => {
    try {
        const land = await c.req.json();
        const createdLand = await (0, land_service_1.createLandService)(land);
        if (!createdLand)
            return c.text("land not created", 404);
        return c.json({ msg: createdLand }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLand = createLand;
const updateLand = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const land = await c.req.json();
    try {
        const searchedLand = await (0, land_service_1.getLandService)(id);
        if (searchedLand == undefined)
            return c.text("land not found", 404);
        // get the data and update it
        const res = await (0, land_service_1.updateLandService)(id, land);
        if (!res)
            return c.text("land not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLand = updateLand;
const deleteLand = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const land = await (0, land_service_1.getLandService)(id);
        if (land == undefined)
            return c.text("land not found", 404);
        const res = await (0, land_service_1.deleteLandService)(id);
        if (!res)
            return c.text("land not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLand = deleteLand;
