"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRouter = void 0;
const hono_1 = require("hono");
const purchase_controller_1 = require("./purchase.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.PurchaseRouter = new hono_1.Hono();
exports.PurchaseRouter.get("/Purchase", bearAuth_1.userAdminRoleAuth, purchase_controller_1.listPurchase);
exports.PurchaseRouter.get("/PurchaseData", bearAuth_1.userAdminRoleAuth, purchase_controller_1.Purchase);
exports.PurchaseRouter.get("/Purchase/:id", bearAuth_1.userAdminRoleAuth, purchase_controller_1.getPurchase);
exports.PurchaseRouter.post("/Purchase", (0, zod_validator_1.zValidator)('json', validators_1.purchaseSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, purchase_controller_1.createPurchase);
exports.PurchaseRouter.put("/Purchase/:id", bearAuth_1.userAdminRoleAuth, purchase_controller_1.updatePurchase);
exports.PurchaseRouter.delete("/Purchase/:id", bearAuth_1.adminRoleAuth, purchase_controller_1.deletePurchase);
