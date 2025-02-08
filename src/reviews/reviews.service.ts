import { Column, eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {reviewsTable, tsReviews,tiReviews} from "../drizzle/schema"


export const reviewsService = async (limit?: number):Promise<tsReviews [] | null> => {
    if (limit) {
        return await db.query.reviewsTable.findMany({
            limit: limit
        });
    }
    return await db.query.reviewsTable.findMany();
}

export const getReviewsService = async (id: number) => {
    return await db.query.reviewsTable.findFirst({
        where: eq(reviewsTable.review_id, id)
    })
}



export const reviewsData = async () => {
    return await db.query.reviewsTable.findMany({
        columns:{
           review_id:true,
           comment:true,
           rating:true,
           user_id:true,
           created_at:true,
        },with:{
           vehicle:{
                columns:{
                   vehicle_id:true,
                   fuel_type:true,
                   exterior_image:true,
                   interior_image:true,
                   location_id:true,
                   seating_capacity:true,
                   transmission:true,
                   engine_capacity:true,
                   color:true,
                   history:true,
                   price:true,
                   model:true,
                   make:true
                }
            },
            house:{
                columns:{
                    exterior_image:true,
                    history:true,
                    house_id:true,
                    interior_image:true,
                    location_id:true,
                    number_of_bedrooms:true,
                    status:true,
                    type:true,
                    year_built:true,
                    price:true,
                    number_of_rooms:true
                }
            },
            land:{
                columns:{
                    land_id:true,
                    land_type:true,
                    size:true,
                    status:true,
                    image:true,
                    history:true,
                    location_id:true,
                    price:true
                }
            }
        }
        
    })
}
export const createReviewsService = async (reviews:tiReviews):Promise<string | null>  => {
    await db.insert(reviewsTable).values(reviews)
    return "reviews created successfully";
}

export const updateReviewsService = async (id: number, reviews: tiReviews):Promise<string | null> => {
    await db.update(reviewsTable).set(reviews).where(eq(reviewsTable.review_id, id))
    return "reviews updated successfully";
}

export const deleteReviewsService = async (id: number):Promise<string | null>  => {
    await db.delete(reviewsTable).where(eq(reviewsTable.review_id, id))
    return "reviews deleted successfully";
}
