import { Context } from "hono";
import { reviewsService, getReviewsService, createReviewsService, updateReviewsService, deleteReviewsService,reviewsData } from "./reviews.service";

export const listReviews= async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await reviewsService(limit);
        if (data == null || data.length == 0) {
            return c.text("reviews not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getReviews= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reviews = await getReviewsService(id);
    if (reviews== undefined) {
        return c.text("reviews not found", 404);
    }
    return c.json(reviews, 200);
}

// data
export const reviews = async (c: Context) => {
    try {
        const data= await reviewsData();
        if (data == null || data.length == 0){
        return c.text("reviews not found", 404);
        }
        return c.json(data,200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
export const createReviews = async (c: Context) => {
    try {
        const reviews = await c.req.json();
        const createdReviews = await createReviewsService(reviews);


        if (!createdReviews) return c.text("reviews not created", 404);
        return c.json({ msg: createdReviews}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateReviews = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reviews = await c.req.json();
    try {
        const searchedReviews = await getReviewsService(id);
        if (searchedReviews == undefined) return c.text("reviews not found", 404);
        // get the data and update it
        const res = await updateReviewsService(id, reviews);
        if (!res) return c.text("reviews not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteReviews= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
       
        const reviews = await getReviewsService(id);
        if (reviews== undefined) return c.text("reviews not found", 404);
        
        const res = await deleteReviewsService(id);
        if (!res) return c.text("reviews not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}