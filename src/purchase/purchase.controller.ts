import { Context } from "hono";
import { purchaseService, getPurchaseService, createPurchaseService, updatePurchaseService, deletePurchaseService,purchaseData } from "./purchase.service";

export const listPurchase= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await purchaseService(limit);
        if (data == null || data.length == 0) {
            return c.text("Purchase not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getPurchase= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Purchase = await getPurchaseService(id);
    if (Purchase== undefined) {
        return c.text("Purchase not found", 404);
    }
    return c.json(Purchase, 200);
}

// data
export const Purchase = async (c: Context) => {
    try {
        const data= await purchaseData();
        if (data == null || data.length == 0){
        return c.text("Purchase not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createPurchase = async (c: Context) => {
    try {
        const Purchase = await c.req.json();
        const createdPurchase = await createPurchaseService(Purchase);


        if (!createdPurchase) return c.text("Purchase not created", 404);
        return c.json({ msg: createdPurchase}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatePurchase = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Purchase = await c.req.json();
    try {
        const searchedPurchase = await getPurchaseService(id);
        if (searchedPurchase == undefined) return c.text("Purchase not found", 404);
        // get the data and update it
        const res = await updatePurchaseService(id, Purchase);
        if (!res) return c.text("Purchase not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletePurchase= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const Purchase = await getPurchaseService(id);
        if (Purchase== undefined) return c.text("Purchase not found", 404);
        
        const res = await deletePurchaseService(id);
        if (!res) return c.text("Purchase not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}