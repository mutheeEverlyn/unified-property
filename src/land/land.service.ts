import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {landTable, tsLand,tiLand} from "../drizzle/schema"


export const landService = async (limit?: number):Promise<tsLand [] | null> => {
    if (limit) {
        return await db.query.landTable.findMany({
            limit: limit
        });
    }
    return await db.query.landTable.findMany();
}

export const getLandService = async (id: number) => {
    return await db.query.landTable.findFirst({
        where: eq(landTable.land_id, id)
    })
}



export const landData = async () => {
    return await db.query.landTable.findMany({
        columns:{
           land_id:true,
           land_type:true,
           history:true,
           size:true,
           status:true,
           image:true,
           location_id:true,
           price:true,
           updated_at:true,
           created_at:true,
        },with:{
           location:{
                columns:{
                   address:true,
                   contact_phone:true,
                   name:true
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
                transaction_date:true,
                transaction_id:true,
                user_id:true
            }
        }
    }
    })
}
export const createLandService = async (land:tiLand):Promise<string | null>  => {
    await db.insert(landTable).values(land)
    return "land created successfully";
}

export const updateLandService = async (id: number, land: tiLand):Promise<string | null> => {
    await db.update(landTable).set(land).where(eq(landTable.land_id, id))
    return "land updated successfully";
}

export const deleteLandService = async (id: number):Promise<string | null>  => {
    await db.delete(landTable).where(eq(landTable.land_id, id))
    return "land deleted successfully";
}
