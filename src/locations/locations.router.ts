import { Hono } from "hono";
import { listLocation, getLocation, createLocation, updateLocation, deleteLocation,location} from "./locations.controller"
import { zValidator } from "@hono/zod-validator";
import { locationSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const locationRouter = new Hono();


locationRouter.get("/location",userAdminRoleAuth, listLocation);

locationRouter.get("/locationData",userAdminRoleAuth, location);

locationRouter.get("/location/:id",userAdminRoleAuth, getLocation)

locationRouter.post("/location",zValidator('json',locationSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createLocation)

locationRouter.put("/location/:id",userAdminRoleAuth, updateLocation)

locationRouter.delete("/location/:id",adminRoleAuth, deleteLocation)

