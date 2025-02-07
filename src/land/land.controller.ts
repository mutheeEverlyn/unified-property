import { Context } from "hono";
import { landService, getLandService, createLandService, updateLandService, deleteLandService,landData } from "./land.service";

export const listLand= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await landService(limit);
        if (data == null || data.length == 0) {
            return c.text("land not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getLand= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const land = await getLandService(id);
    if (land== undefined) {
        return c.text("land not found", 404);
    }
    return c.json(land, 200);
}

// data
export const land = async (c: Context) => {
    try {
        const data= await landData();
        if (data == null || data.length == 0){
        return c.text("land not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createLand = async (c: Context) => {
    try {
        const land = await c.req.json();
        const createdLand = await createLandService(land);


        if (!createdLand) return c.text("land not created", 404);
        return c.json({ msg: createdLand}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateLand = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const land = await c.req.json();
    try {
        const searchedLand = await getLandService(id);
        if (searchedLand == undefined) return c.text("land not found", 404);
        // get the data and update it
        const res = await updateLandService(id, land);
        if (!res) return c.text("land not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteLand= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const land = await getLandService(id);
        if (land== undefined) return c.text("land not found", 404);
        
        const res = await deleteLandService(id);
        if (!res) return c.text("land not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}