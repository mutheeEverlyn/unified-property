import { Hono } from "hono";
import { listHouse, getHouse, createHouse, updateHouse, deleteHouse,house} from "./house.controller"
import { zValidator } from "@hono/zod-validator";
import { houseSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const houseRouter = new Hono();


houseRouter.get("/house",userAdminRoleAuth, listHouse);

houseRouter.get("/houseData",userAdminRoleAuth, house);

houseRouter.get("/house/:id",userAdminRoleAuth, getHouse)

houseRouter.post("/house",zValidator('json',houseSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createHouse)

houseRouter.put("/house/:id",adminRoleAuth, updateHouse)

houseRouter.delete("/house/:id",adminRoleAuth, deleteHouse)

