import { z } from 'zod'

export const userSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    address:z.string(),
    password: z.string(),
    role: z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})

export const vehicleSchema=z.object({
    engine_capacity:z.string(),
    make:z.string(),
    model:z.string(),
    year:z.number(),
    transmission:z.string(),
    status:z.string(),
    price:z.number(),
    seating_capacity:z.number(),
    fuel_type:z.string(),
    color:z.string(),
    location_id:z.number(),
    exterior_image:z.string(),
    interior_image:z.string(),
    history:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const landSchema=z.object({
    history:z.string(),
    size:z.string(),
    status:z.string(),
    land_type:z.string(),
    price:z.number(),
    location_id:z.number(),
    image:z.number(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const houseSchema=z.object({
    location_id:z.number(),
    number_of_rooms:z.number(),
    number_of_bedrooms:z.number(),
    type:z.string(),
    status:z.string(),
    price:z.number(),
    year_built:z.number(),
    exterior_image:z.string(),
    interior_image:z.string(),
    history:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const locationSchema = z.object({
    address: z.string(),
    name: z.string(),
    contact:z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const purchaseSchema = z.object({
    purchase_status: z.string().optional(),
    total_amount: z.number(),
    user_id: z.number(),
    location_id:z.number(),
    purchase_date:z.string().optional()
})
export const transactionSchema = z.object({
    purchase_id: z.number(),
    user_id: z.number(),
    amount:z.number(),
    status: z.string(),
    phone_number:z.string(),
    transaction_date:z.string().optional()
})
export const reviewsSchema = z.object({
    user_id: z.number(),
    rating:z.number(),
    comment: z.string(),
    created_at:z.string().optional()
})