import { Hono } from "hono";
import { listPurchase, getPurchase, createPurchase, updatePurchase, deletePurchase,Purchase} from "./purchase.controller"
import { zValidator } from "@hono/zod-validator";
import { purchaseSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const PurchaseRouter = new Hono();


PurchaseRouter.get("/purchase",userAdminRoleAuth, listPurchase);

PurchaseRouter.get("pPurchaseData",userAdminRoleAuth, Purchase);

PurchaseRouter.get("/purchase/:id",userAdminRoleAuth, getPurchase)

PurchaseRouter.post("/purchase",zValidator('json',purchaseSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createPurchase)

PurchaseRouter.put("/purchase/:id",userAdminRoleAuth, updatePurchase)

PurchaseRouter.delete("/purchase/:id",userAdminRoleAuth, deletePurchase)

