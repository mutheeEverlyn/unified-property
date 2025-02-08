import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {purchaseTable, tsPurchase,tiPurchase} from "../drizzle/schema"


export const purchaseService = async (limit?: number):Promise<tsPurchase [] | null> => {
    if (limit) {
        return await db.query.purchaseTable.findMany({
            limit: limit
        });
    }
    return await db.query.purchaseTable.findMany();
}

export const getPurchaseService = async (id: number) => {
    return await db.query.purchaseTable.findFirst({
        where: eq(purchaseTable.purchase_id, id)
    })
}



export const purchaseData = async () => {
    return await db.query.purchaseTable.findMany({
        columns:{
           purchase_id:true,
           purchase_date:true,
           location_id:true,
           purchase_status:true,
           user_id:true,
           total_amount:true
        },with:{
           transaction:{
                columns:{
                   purchase_id:true,
                   amount:true,
                   user_id:true,
                   status:true,
                   transaction_date:true,
                   transaction_id:true
                }
            },
            users:{
                columns:{
                    address:true,
                    contact_phone:true,
                    email:true,
                    full_name:true,
                    user_id:true
                }
            }
        }
    })
}
export const createPurchaseService = async (purchase:tiPurchase):Promise<string | null>  => {
    await db.insert(purchaseTable).values(purchase)
    return "purchase created successfully";
}

export const updatePurchaseService = async (id: number, purchase: tiPurchase):Promise<string | null> => {
    await db.update(purchaseTable).set(purchase).where(eq(purchaseTable.purchase_id, id))
    return "purchase updated successfully";
}

export const deletePurchaseService = async (id: number):Promise<string | null>  => {
    await db.delete(purchaseTable).where(eq(purchaseTable.purchase_id, id))
    return "purchase deleted successfully";
}
