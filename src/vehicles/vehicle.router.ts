import { Hono } from "hono";
import { listVehicles, getVehicles, createVehicles, updateVehicles, deleteVehicles,vehicles} from "./vehicle.controller"
import { zValidator } from "@hono/zod-validator";
import { vehicleSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const vehicleRouter = new Hono();


vehicleRouter.get("/vehicles",userAdminRoleAuth, listVehicles);

vehicleRouter.get("/vehiclesData",userAdminRoleAuth, vehicles);

vehicleRouter.get("/vehicles/:id",userAdminRoleAuth, getVehicles)

vehicleRouter.post("/vehicles",zValidator('json',vehicleSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createVehicles)

vehicleRouter.put("/vehicles/:id",userAdminRoleAuth, updateVehicles)

vehicleRouter.delete("/vehicles/:id",adminRoleAuth, deleteVehicles)

