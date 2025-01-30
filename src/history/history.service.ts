import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {historyTable, tsHistory,tiHistory} from "../drizzle/schema"


export const historyService = async (limit?: number):Promise<tsHistory [] | null> => {
    if (limit) {
        return await db.query.historyTable.findMany({
            limit: limit
        });
    }
    return await db.query.historyTable.findMany();
}

export const getHistoryService = async (id: number) => {
    return await db.query.historyTable.findFirst({
        where: eq(historyTable.history_id, id)
    })
}



export const historyData = async () => {
    return await db.query.historyTable.findMany({
        columns:{
           history_id:true,
           description:true,
           event:true,
           event_date:true,
           property_id:true,
           property_type:true
        },with:{
           house:{
                columns:{
                   house_id:true,
                   price:true,
                   number_of_rooms:true,
                   year_built:true,
                   address:true
                }
            },
            land:{
                columns:{
                    land_id:true,
                    land_type:true,
                    location:true,
                    price:true,
                    owner_id:true,
                    size:true
                }
            },
            vehicle:{
                columns:{
                    fuel_type:true,
                    vehicle_id:true,
                    make:true,
                    model:true,
                    mileage:true
                }
            }
        }
    })
}
export const createHistoryService = async (history:tiHistory):Promise<string | null>  => {
    await db.insert(historyTable).values(history)
    return "history created successfully";
}

export const updateHistoryService = async (id: number, history: tiHistory):Promise<string | null> => {
    await db.update(historyTable).set(history).where(eq(historyTable.history_id, id))
    return "history updated successfully";
}

export const deleteHistoryService = async (id: number):Promise<string | null>  => {
    await db.delete(historyTable).where(eq(historyTable.history_id, id))
    return "history deleted successfully";
}
