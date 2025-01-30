import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {bookingsTable, tsBookings,tiBookings} from "../drizzle/schema"


export const bookingsService = async (limit?: number):Promise<tsBookings [] | null> => {
    if (limit) {
        return await db.query.bookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.bookingsTable.findMany();
}

export const getBookingsService = async (id: number) => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.booking_id, id)
    })
}



export const bookingsData = async () => {
    return await db.query.bookingsTable.findMany({
        columns:{
           booking_id:true,
           booking_date:true,
           property_id:true,
           property_type:true,
           status:true,
           user_id:true
        },with:{
           transaction:{
                columns:{
                   booking_id:true,
                   buyer_id:true,
                   property_id:true,
                   property_type:true,
                   sale_price:true,
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
export const createBookingsService = async (booking:tiBookings):Promise<string | null>  => {
    await db.insert(bookingsTable).values(booking)
    return "booking created successfully";
}

export const updateBookingsService = async (id: number, booking: tiBookings):Promise<string | null> => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.booking_id, id))
    return "booking updated successfully";
}

export const deleteBookingsService = async (id: number):Promise<string | null>  => {
    await db.delete(bookingsTable).where(eq(bookingsTable.booking_id, id))
    return "booking deleted successfully";
}
