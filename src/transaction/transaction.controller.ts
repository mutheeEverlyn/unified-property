import { Context } from "hono";
import { transactionsService, getTransactionsService, createTransactionsService, updateTransactionsService, deleteTransactionsService,transactionsData } from "./transaction.service";

export const listTransactions= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await transactionsService(limit);
        if (data == null || data.length == 0) {
            return c.text("transactions not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getTransactions= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const transactions = await getTransactionsService(id);
    if (transactions== undefined) {
        return c.text("transactions not found", 404);
    }
    return c.json(transactions, 200);
}

// data
export const transactions = async (c: Context) => {
    try {
        const data= await transactionsData();
        if (data == null || data.length == 0){
        return c.text("transactions not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createTransactions = async (c: Context) => {
    try {
        const transactions = await c.req.json();
        const createdTransactions = await createTransactionsService(transactions);


        if (!createdTransactions) return c.text("transactions not created", 404);
        return c.json({ msg: createdTransactions}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateTransactions = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const transactions = await c.req.json();
    try {
        const searchedTransactions = await getTransactionsService(id);
        if (searchedTransactions == undefined) return c.text("transactions not found", 404);
        // get the data and update it
        const res = await updateTransactionsService(id, transactions);
        if (!res) return c.text("transactions not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteTransactions= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const transactions = await getTransactionsService(id);
        if (transactions== undefined) return c.text("transactions not found", 404);
        
        const res = await deleteTransactionsService(id);
        if (!res) return c.text("transactions not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}