import { Hono } from "hono";
import { listTransactions, getTransactions, createTransactions, updateTransactions, deleteTransactions,transactions} from "./transaction.controller"
import { zValidator } from "@hono/zod-validator";
import { transactionSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const transactionsRouter = new Hono();


transactionsRouter.get("/transactions",userAdminRoleAuth, listTransactions);

transactionsRouter.get("/transactionsData",userAdminRoleAuth, transactions);

transactionsRouter.get("/transactions/:id",userAdminRoleAuth, getTransactions)

transactionsRouter.post("/transactions",zValidator('json',transactionSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createTransactions)

transactionsRouter.put("/transactions/:id",userAdminRoleAuth, updateTransactions)

transactionsRouter.delete("/transactions/:id",adminRoleAuth, deleteTransactions)

