import { Context } from "hono";
import { historyService, getHistoryService, createHistoryService, updateHistoryService, deleteHistoryService,historyData } from "./history.service";

export const listHistory= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await historyService(limit);
        if (data == null || data.length == 0) {
            return c.text("history not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getHistory= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const history = await getHistoryService(id);
    if (history== undefined) {
        return c.text("history not found", 404);
    }
    return c.json(history, 200);
}

// data
export const history = async (c: Context) => {
    try {
        const data= await historyData();
        if (data == null || data.length == 0){
        return c.text("history not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createHistory = async (c: Context) => {
    try {
        const history = await c.req.json();
        const createdHistory = await createHistoryService(history);


        if (!createdHistory) return c.text("history not created", 404);
        return c.json({ msg: createdHistory}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateHistory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const history = await c.req.json();
    try {
        const searchedHistory = await getHistoryService(id);
        if (searchedHistory == undefined) return c.text("history not found", 404);
        // get the data and update it
        const res = await updateHistoryService(id, history);
        if (!res) return c.text("history not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteHistory= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const history = await getHistoryService(id);
        if (history== undefined) return c.text("history not found", 404);
        
        const res = await deleteHistoryService(id);
        if (!res) return c.text("history not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}