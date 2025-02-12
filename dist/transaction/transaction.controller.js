"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactions = exports.updateTransactions = exports.createTransactions = exports.transactions = exports.getTransactions = exports.listTransactions = void 0;
const transaction_service_1 = require("./transaction.service");
const listTransactions = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, transaction_service_1.transactionsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("transactions not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listTransactions = listTransactions;
const getTransactions = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const transactions = await (0, transaction_service_1.getTransactionsService)(id);
    if (transactions == undefined) {
        return c.text("transactions not found", 404);
    }
    return c.json(transactions, 200);
};
exports.getTransactions = getTransactions;
// data
const transactions = async (c) => {
    try {
        const data = await (0, transaction_service_1.transactionsData)();
        if (data == null || data.length == 0) {
            return c.text("transactions not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.transactions = transactions;
const createTransactions = async (c) => {
    try {
        const transactions = await c.req.json();
        const createdTransactions = await (0, transaction_service_1.createTransactionsService)(transactions);
        if (!createdTransactions)
            return c.text("transactions not created", 404);
        return c.json({ msg: createdTransactions }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createTransactions = createTransactions;
const updateTransactions = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const transactions = await c.req.json();
    try {
        const searchedTransactions = await (0, transaction_service_1.getTransactionsService)(id);
        if (searchedTransactions == undefined)
            return c.text("transactions not found", 404);
        // get the data and update it
        const res = await (0, transaction_service_1.updateTransactionsService)(id, transactions);
        if (!res)
            return c.text("transactions not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateTransactions = updateTransactions;
const deleteTransactions = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const transactions = await (0, transaction_service_1.getTransactionsService)(id);
        if (transactions == undefined)
            return c.text("transactions not found", 404);
        const res = await (0, transaction_service_1.deleteTransactionsService)(id);
        if (!res)
            return c.text("transactions not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteTransactions = deleteTransactions;
