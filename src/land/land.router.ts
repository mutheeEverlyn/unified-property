import { Hono } from "hono";
import { listLand, getLand, createLand, updateLand, deleteLand,land} from "./land.controller"
import { zValidator } from "@hono/zod-validator";
import { landSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const landRouter = new Hono();


landRouter.get("/land",userAdminRoleAuth, listLand);

landRouter.get("/landData",userAdminRoleAuth, land);

landRouter.get("/land/:id",userAdminRoleAuth, getLand)

landRouter.post("/land",zValidator('json',landSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createLand)

landRouter.put("/land/:id",userAdminRoleAuth, updateLand)

landRouter.delete("/land/:id",adminRoleAuth, deleteLand)

