import { Context } from "hono";
import { bookingsService, getBookingsService, createBookingsService, updateBookingsService, deleteBookingsService,bookingsData } from "./bookings.service";

export const listBookings= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await bookingsService(limit);
        if (data == null || data.length == 0) {
            return c.text("bookings not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBookings= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const bookings = await getBookingsService(id);
    if (bookings== undefined) {
        return c.text("bookings not found", 404);
    }
    return c.json(bookings, 200);
}

// data
export const bookings = async (c: Context) => {
    try {
        const data= await bookingsData();
        if (data == null || data.length == 0){
        return c.text("bookings not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createBookings = async (c: Context) => {
    try {
        const bookings = await c.req.json();
        const createdBookings = await createBookingsService(bookings);


        if (!createdBookings) return c.text("bookings not created", 404);
        return c.json({ msg: createdBookings}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBookings = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const bookings = await c.req.json();
    try {
        const searchedBookings = await getBookingsService(id);
        if (searchedBookings == undefined) return c.text("bookings not found", 404);
        // get the data and update it
        const res = await updateBookingsService(id, bookings);
        if (!res) return c.text("bookings not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBookings= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const bookings = await getBookingsService(id);
        if (bookings== undefined) return c.text("bookings not found", 404);
        
        const res = await deleteBookingsService(id);
        if (!res) return c.text("bookings not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}