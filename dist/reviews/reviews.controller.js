"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviews = exports.updateReviews = exports.createReviews = exports.reviews = exports.getReviews = exports.listReviews = void 0;
const reviews_service_1 = require("./reviews.service");
const listReviews = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, reviews_service_1.reviewsService)(limit);
        if (data == null || data.length == 0) {
            return c.text("reviews not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listReviews = listReviews;
const getReviews = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const reviews = await (0, reviews_service_1.getReviewsService)(id);
    if (reviews == undefined) {
        return c.text("reviews not found", 404);
    }
    return c.json(reviews, 200);
};
exports.getReviews = getReviews;
// data
const reviews = async (c) => {
    try {
        const data = await (0, reviews_service_1.reviewsData)();
        if (data == null || data.length == 0) {
            return c.text("reviews not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.reviews = reviews;
const createReviews = async (c) => {
    try {
        const reviews = await c.req.json();
        const createdReviews = await (0, reviews_service_1.createReviewsService)(reviews);
        if (!createdReviews)
            return c.text("reviews not created", 404);
        return c.json({ msg: createdReviews }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createReviews = createReviews;
const updateReviews = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const reviews = await c.req.json();
    try {
        const searchedReviews = await (0, reviews_service_1.getReviewsService)(id);
        if (searchedReviews == undefined)
            return c.text("reviews not found", 404);
        // get the data and update it
        const res = await (0, reviews_service_1.updateReviewsService)(id, reviews);
        if (!res)
            return c.text("reviews not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateReviews = updateReviews;
const deleteReviews = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const reviews = await (0, reviews_service_1.getReviewsService)(id);
        if (reviews == undefined)
            return c.text("reviews not found", 404);
        const res = await (0, reviews_service_1.deleteReviewsService)(id);
        if (!res)
            return c.text("reviews not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteReviews = deleteReviews;
