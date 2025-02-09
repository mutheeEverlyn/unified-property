import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {transactionsTable, tsTransactions,tiTransactions} from "../drizzle/schema"


export const transactionsService = async (limit?: number):Promise<tsTransactions [] | null> => {
    if (limit) {
        return await db.query.transactionsTable.findMany({
            limit: limit
        });
    }
    return await db.query.transactionsTable.findMany();
}

export const getTransactionsService = async (id: number) => {
    return await db.query.transactionsTable.findFirst({
        where: eq(transactionsTable.transaction_id, id)
    })
}



export const transactionsData = async () => {
    return await db.query.transactionsTable.findMany({
        columns:{
           transaction_id:true,
           purchase_id:true,
           user_id:true,
           amount:true,
           status:true,
           transaction_date:true
        },with:{
           purchaseTable:{
                columns:{
                     purchase_id:true,
                     purchase_date:true,
                     location_id:true,
                     purchase_status:true,
                     user_id:true,
                     total_amount:true
                }
            },
            user:{
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
export const createTransactionsService = async (transactions:tiTransactions):Promise<string | null>  => {
    await db.insert(transactionsTable).values(transactions)
    return "transactions created successfully";
}

export const updateTransactionsService = async (id: number, transactions: tiTransactions):Promise<string | null> => {
    await db.update(transactionsTable).set(transactions).where(eq(transactionsTable.transaction_id, id))
    return "transactions updated successfully";
}

export const deleteTransactionsService = async (id: number):Promise<string | null>  => {
    await db.delete(transactionsTable).where(eq(transactionsTable.transaction_id, id))
    return "transactions deleted successfully";
}
