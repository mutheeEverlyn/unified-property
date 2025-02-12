"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchase = exports.updatePurchase = exports.createPurchase = exports.Purchase = exports.getPurchase = exports.listPurchase = void 0;
const purchase_service_1 = require("./purchase.service");
const listPurchase = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, purchase_service_1.purchaseService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Purchase not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listPurchase = listPurchase;
const getPurchase = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Purchase = await (0, purchase_service_1.getPurchaseService)(id);
    if (Purchase == undefined) {
        return c.text("Purchase not found", 404);
    }
    return c.json(Purchase, 200);
};
exports.getPurchase = getPurchase;
// data
const Purchase = async (c) => {
    try {
        const data = await (0, purchase_service_1.purchaseData)();
        if (data == null || data.length == 0) {
            return c.text("Purchase not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.Purchase = Purchase;
const createPurchase = async (c) => {
    try {
        const Purchase = await c.req.json();
        const createdPurchase = await (0, purchase_service_1.createPurchaseService)(Purchase);
        if (!createdPurchase)
            return c.text("Purchase not created", 404);
        return c.json({ msg: createdPurchase }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createPurchase = createPurchase;
const updatePurchase = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Purchase = await c.req.json();
    try {
        const searchedPurchase = await (0, purchase_service_1.getPurchaseService)(id);
        if (searchedPurchase == undefined)
            return c.text("Purchase not found", 404);
        // get the data and update it
        const res = await (0, purchase_service_1.updatePurchaseService)(id, Purchase);
        if (!res)
            return c.text("Purchase not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatePurchase = updatePurchase;
const deletePurchase = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const Purchase = await (0, purchase_service_1.getPurchaseService)(id);
        if (Purchase == undefined)
            return c.text("Purchase not found", 404);
        const res = await (0, purchase_service_1.deletePurchaseService)(id);
        if (!res)
            return c.text("Purchase not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePurchase = deletePurchase;
