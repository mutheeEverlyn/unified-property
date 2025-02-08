import { Hono } from "hono";
import { listPurchase, getPurchase, createPurchase, updatePurchase, deletePurchase,Purchase} from "./purchase.controller"
import { zValidator } from "@hono/zod-validator";
import { purchaseSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const PurchaseRouter = new Hono();


PurchaseRouter.get("/Purchase",userAdminRoleAuth, listPurchase);

PurchaseRouter.get("/PurchaseData",userAdminRoleAuth, Purchase);

PurchaseRouter.get("/Purchase/:id",userAdminRoleAuth, getPurchase)

PurchaseRouter.post("/Purchase",zValidator('json',purchaseSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createPurchase)

PurchaseRouter.put("/Purchase/:id",userAdminRoleAuth, updatePurchase)

PurchaseRouter.delete("/Purchase/:id",adminRoleAuth, deletePurchase)

