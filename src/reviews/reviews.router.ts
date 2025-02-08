import { Hono } from "hono";
import { listReviews, getReviews, createReviews, updateReviews, deleteReviews,reviews} from "./reviews.controller"
import { zValidator } from "@hono/zod-validator";
import { reviewsSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const reviewsRouter = new Hono();


reviewsRouter.get("/reviews",userAdminRoleAuth, listReviews);

reviewsRouter.get("/reviewsData",userAdminRoleAuth, reviews);

reviewsRouter.get("/reviews/:id",userAdminRoleAuth, getReviews)

reviewsRouter.post("/reviews",zValidator('json',reviewsSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createReviews)

reviewsRouter.put("/reviews/:id",userAdminRoleAuth, updateReviews)

reviewsRouter.delete("/reviews/:id",adminRoleAuth, deleteReviews)

