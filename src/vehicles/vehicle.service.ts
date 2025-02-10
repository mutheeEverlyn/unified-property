import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {vehiclesTable, tsVehicles,tiVehicles} from "../drizzle/schema"


export const vehiclesService = async (limit?: number):Promise<tsVehicles [] | null> => {
    if (limit) {
        return await db.query.vehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.vehiclesTable.findMany();
}

export const getVehiclesService = async (id: number) => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.vehicle_id, id)
    })
}

export const vehiclesData = async () => {
    return await db.query.vehiclesTable.findMany({
        columns:{
           vehicle_id:true,
           fuel_type:true,
           exterior_image:true,
           make:true,
           color:true,
           engine_capacity:true,
           history:true,
           interior_image:true,
           seating_capacity:true,
           status:true,
           transmission:true,
           location_id:true,
           model:true,
           price:true,
           year:true,
           updated_at:true,
           created_at:true,
        },with:{
           location:{
                columns:{
                   address:true,
                   contact_phone:true,
                   name:true,
                   location_id:true
                }
            },
            reviews:{
                columns:{
                    comment:true,
                    rating:true,
                    user_id:true
                }
            },
            transactions:{
                columns:{
                    amount:true,
                    purchase_id:true,
                    status:true,
                    transaction_date:true,
                    user_id:true,
                    transaction_id:true
                }
            }
        }
    })
}
export const createVehiclesService = async (vehicle:tiVehicles):Promise<string | null>  => {
    await db.insert(vehiclesTable).values(vehicle)
    return "vehicle created successfully";
}

export const updateVehiclesService = async (id: number, vehicle: tiVehicles):Promise<string | null> => {
    await db.update(vehiclesTable).set(vehicle).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle updated successfully";
}

export const deleteVehiclesService = async (id: number):Promise<string | null>  => {
    await db.delete(vehiclesTable).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle deleted successfully";
}
