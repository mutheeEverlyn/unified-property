"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsSchema = exports.transactionSchema = exports.purchaseSchema = exports.locationSchema = exports.houseSchema = exports.landSchema = exports.vehicleSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    address: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
exports.vehicleSchema = zod_1.z.object({
    engine_capacity: zod_1.z.string(),
    make: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    transmission: zod_1.z.string(),
    status: zod_1.z.string(),
    price: zod_1.z.number(),
    seating_capacity: zod_1.z.number(),
    fuel_type: zod_1.z.string(),
    color: zod_1.z.string(),
    location_id: zod_1.z.number(),
    exterior_image: zod_1.z.string(),
    interior_image: zod_1.z.string(),
    history: zod_1.z.string(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
exports.landSchema = zod_1.z.object({
    history: zod_1.z.string(),
    size: zod_1.z.string(),
    status: zod_1.z.string(),
    land_type: zod_1.z.string(),
    price: zod_1.z.number(),
    location_id: zod_1.z.number(),
    image: zod_1.z.number(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
exports.houseSchema = zod_1.z.object({
    location_id: zod_1.z.number(),
    number_of_rooms: zod_1.z.number(),
    number_of_bedrooms: zod_1.z.number(),
    type: zod_1.z.string(),
    status: zod_1.z.string(),
    price: zod_1.z.number(),
    year_built: zod_1.z.number(),
    exterior_image: zod_1.z.string(),
    interior_image: zod_1.z.string(),
    history: zod_1.z.string(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
exports.locationSchema = zod_1.z.object({
    address: zod_1.z.string(),
    name: zod_1.z.string(),
    contact: zod_1.z.string(),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional()
});
exports.purchaseSchema = zod_1.z.object({
    purchase_status: zod_1.z.string().optional(),
    total_amount: zod_1.z.number(),
    user_id: zod_1.z.number(),
    location_id: zod_1.z.number(),
    purchase_date: zod_1.z.string().optional()
});
exports.transactionSchema = zod_1.z.object({
    purchase_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    amount: zod_1.z.number(),
    status: zod_1.z.string(),
    transaction_date: zod_1.z.string().optional()
});
exports.reviewsSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    rating: zod_1.z.number(),
    comment: zod_1.z.string(),
    created_at: zod_1.z.string().optional()
});
