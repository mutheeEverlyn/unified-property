"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRouter = void 0;
const hono_1 = require("hono");
const transaction_controller_1 = require("./transaction.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.transactionsRouter = new hono_1.Hono();
exports.transactionsRouter.get("/transactions", bearAuth_1.userAdminRoleAuth, transaction_controller_1.listTransactions);
exports.transactionsRouter.get("/transactionsData", bearAuth_1.userAdminRoleAuth, transaction_controller_1.transactions);
exports.transactionsRouter.get("/transactions/:id", bearAuth_1.userAdminRoleAuth, transaction_controller_1.getTransactions);
exports.transactionsRouter.post("/transactions", (0, zod_validator_1.zValidator)('json', validators_1.transactionSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, transaction_controller_1.createTransactions);
exports.transactionsRouter.put("/transactions/:id", bearAuth_1.userAdminRoleAuth, transaction_controller_1.updateTransactions);
exports.transactionsRouter.delete("/transactions/:id", bearAuth_1.adminRoleAuth, transaction_controller_1.deleteTransactions);
