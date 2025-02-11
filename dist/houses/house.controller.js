"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouse = exports.updateHouse = exports.createHouse = exports.house = exports.getHouse = exports.listHouse = void 0;
const house_service_1 = require("./house.service");
const listHouse = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, house_service_1.houseService)(limit);
        if (data == null || data.length == 0) {
            return c.text("house not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listHouse = listHouse;
const getHouse = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const house = await (0, house_service_1.getHouseService)(id);
    if (house == undefined) {
        return c.text("house not found", 404);
    }
    return c.json(house, 200);
};
exports.getHouse = getHouse;
// data
const house = async (c) => {
    try {
        const data = await (0, house_service_1.houseData)();
        if (data == null || data.length == 0) {
            return c.text("house not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.house = house;
const createHouse = async (c) => {
    try {
        const house = await c.req.json();
        const createdHouse = await (0, house_service_1.createHouseService)(house);
        if (!createdHouse)
            return c.text("house not created", 404);
        return c.json({ msg: createdHouse }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createHouse = createHouse;
const updateHouse = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const house = await c.req.json();
    try {
        const searchedHouse = await (0, house_service_1.getHouseService)(id);
        if (searchedHouse == undefined)
            return c.text("house not found", 404);
        // get the data and update it
        const res = await (0, house_service_1.updateHouseService)(id, house);
        if (!res)
            return c.text("house not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateHouse = updateHouse;
const deleteHouse = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const house = await (0, house_service_1.getHouseService)(id);
        if (house == undefined)
            return c.text("house not found", 404);
        const res = await (0, house_service_1.deleteHouseService)(id);
        if (!res)
            return c.text("house not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteHouse = deleteHouse;
