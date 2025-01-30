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
    owner_id:z.number(),
    make:z.string(),
    model:z.string(),
    year:z.number(),
    vin:z.number(),
    status:z.string(),
    price:z.number(),
    milleage:z.number(),
    fuel_type:z.string(),
    location:z.string(),
    image:z.number(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const landSchema=z.object({
    owner_id:z.number(),
    size:z.number(),
    status:z.string(),
    land_type:z.string(),
    price:z.number(),
    location:z.string(),
    image:z.number(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const houseSchema=z.object({
    owner_id:z.number(),
    address:z.string(),
    name:z.string(),
    number_of_rooms:z.number(),
    size:z.number(),
    status:z.string(),
    price:z.number(),
    year_built:z.number(),
    image:z.number(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const locationSchema = z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    address:z.string(),
    zip_code: z.string(),
    created_at:z.string().optional(),
    updated_at:z.string().optional()
})
export const historySchema = z.object({
    property_type: z.string(),
    property_id: z.number(),
    event: z.string(),
    event_date:z.string().optional(),
    description: z.string()
})
export const bookingsSchema = z.object({
    property_type: z.string(),
    property_id: z.number(),
    user_id: z.number(),
    status:z.string(),
    booking_date:z.string().optional()
})
export const transactionSchema = z.object({
    property_type: z.string(),
    property_id: z.number(),
    booking_id: z.number(),
    buyer_id:z.number(),
    sale_price: z.number(),
    status: z.string(),
    transaction_date:z.string().optional()
})
export const reviewsSchema = z.object({
    property_type: z.string(),
    property_id: z.number(),
    user_id: z.number(),
    rating:z.number(),
    comment: z.string(),
    created_at:z.string().optional()
})