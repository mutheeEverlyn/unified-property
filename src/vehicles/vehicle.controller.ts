import { Context } from "hono";
import { vehiclesService, getVehiclesService, createVehiclesService, updateVehiclesService, deleteVehiclesService,vehiclesData } from "./vehicle.service";

export const listVehicles= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await vehiclesService(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicles not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getVehicles= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicles = await getVehiclesService(id);
    if (vehicles== undefined) {
        return c.text("vehicles not found", 404);
    }
    return c.json(vehicles, 200);
}

// data
export const vehicles = async (c: Context) => {
    try {
        const data= await vehiclesData();
        if (data == null || data.length == 0){
        return c.text("vehicles not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createVehicles = async (c: Context) => {
    try {
        const vehicles = await c.req.json();
        const createdVehicles = await createVehiclesService(vehicles);


        if (!createdVehicles) return c.text("vehicles not created", 404);
        return c.json({ msg: createdVehicles}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateVehicles = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicles = await c.req.json();
    try {
        const searchedVehicles = await getVehiclesService(id);
        if (searchedVehicles == undefined) return c.text("vehicles not found", 404);
        // get the data and update it
        const res = await updateVehiclesService(id, vehicles);
        if (!res) return c.text("vehicles not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicles= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const vehicles = await getVehiclesService(id);
        if (vehicles== undefined) return c.text("vehicles not found", 404);
        
        const res = await deleteVehiclesService(id);
        if (!res) return c.text("vehicles not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}