import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {housesTable, tsHouses,tiHouses} from "../drizzle/schema"


export const houseService = async (limit?: number):Promise<tsHouses [] | null> => {
    if (limit) {
        return await db.query.housesTable.findMany({
            limit: limit
        });
    }
    return await db.query.housesTable.findMany();
}

export const getHouseService = async (id: number) => {
    return await db.query.housesTable.findFirst({
        where: eq(housesTable.house_id, id)
    })
}



export const houseData = async () => {
    return await db.query.housesTable.findMany({
        columns:{
           house_id:true,
           exterior_image:true,
           interior_image:true,
           history:true,
           number_of_bedrooms:true,
           location_id:true,
           type:true,
           number_of_rooms:true,
           year_built:true,
           status:true,
           price:true,
           updated_at:true,
           created_at:true,
        },with:{
           location:{
                columns:{
                   address:true,
                   contact_phone:true,
                     location_id:true,
                     name:true
                }
            },
            reviews:{
                columns:{
                    comment:true,
                    created_at:true,
                    rating:true,
                    review_id:true,
                    user_id:true
                }
            },
            transactions:{
                columns:{
                    amount:true,
                    status:true,
                    transaction_date:true,
                    transaction_id:true,
                    user_id:true
                }
            }
        }
    })
}
export const createHouseService = async (house:tiHouses):Promise<string | null>  => {
    await db.insert(housesTable).values(house)
    return "house created successfully";
}

export const updateHouseService = async (id: number, house: tiHouses):Promise<string | null> => {
    await db.update(housesTable).set(house).where(eq(housesTable.house_id, id))
    return "house updated successfully";
}

export const deleteHouseService = async (id: number):Promise<string | null>  => {
    await db.delete(housesTable).where(eq(housesTable.house_id, id))
    return "house deleted successfully";
}
