import { Context } from "hono";
import { locationService, getLocationService, createLocationService, updateLocationService, deleteLocationService,locationData } from "./locations.service";

export const listLocation= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await locationService(limit);
        if (data == null || data.length == 0) {
            return c.text("location not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getLocation= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const location = await getLocationService(id);
    if (location== undefined) {
        return c.text("location not found", 404);
    }
    return c.json(location, 200);
}

// data
export const location = async (c: Context) => {
    try {
        const data= await locationData();
        if (data == null || data.length == 0){
        return c.text("location not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createLocation = async (c: Context) => {
    try {
        const location = await c.req.json();
        const createdLocation = await createLocationService(location);


        if (!createdLocation) return c.text("location not created", 404);
        return c.json({ msg: createdLocation}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const location = await c.req.json();
    try {
        const searchedLocation = await getLocationService(id);
        if (searchedLocation == undefined) return c.text("location not found", 404);
        // get the data and update it
        const res = await updateLocationService(id, location);
        if (!res) return c.text("location not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteLocation= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const location = await getLocationService(id);
        if (location== undefined) return c.text("location not found", 404);
        
        const res = await deleteLocationService(id);
        if (!res) return c.text("location not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}