import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {locationTable, tsLocation,tiLocation} from "../drizzle/schema"


export const locationService = async (limit?: number):Promise<tsLocation [] | null> => {
    if (limit) {
        return await db.query.locationTable.findMany({
            limit: limit
        });
    }
    return await db.query.locationTable.findMany();
}

export const getLocationService = async (id: number) => {
    return await db.query.locationTable.findFirst({
        where: eq(locationTable.location_id, id)
    })
}



export const locationData = async () => {
    return await db.query.locationTable.findMany({
        columns:{
           location_id:true,
           address:true,
           contact_phone:true,
           name:true,
           updated_at:true,
           created_at:true,
        },with:{
           houses:{
                columns:{
                   created_at:true,
                   house_id:true,
                   number_of_rooms:true,
                exterior_image:true,
                interior_image:true,
                number_of_bedrooms:true,
                price:true,
                history:true,
                status:true,
                type:true,
                year_built:true
                }
            },
            land:{
                columns:{
                    land_id:true,
                    land_type:true,
                    price:true,
                    location_id:true,
                    size:true
                }
            },
            vehicles:{
                columns:{
                    location_id:true,
                    make:true,
                    interior_image:true,
                    exterior_image:true,
                    vehicle_id:true,
                    year:true,
                    status:true,
                    seating_capacity:true,
                    transmission:true,
                    engine_capacity:true,
                    fuel_type:true,
                    color:true,
                    history:true,
                    price:true,
                    model:true
                }
            }
        }
    })
}
export const createLocationService = async (location:tiLocation):Promise<string | null>  => {
    await db.insert(locationTable).values(location)
    return "location created successfully";
}

export const updateLocationService = async (id: number, location: tiLocation):Promise<string | null> => {
    await db.update(locationTable).set(location).where(eq(locationTable.location_id, id))
    return "location updated successfully";
}

export const deleteLocationService = async (id: number):Promise<string | null>  => {
    await db.delete(locationTable).where(eq(locationTable.location_id, id))
    return "location deleted successfully";
}
