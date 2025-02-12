"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchaseService = exports.updatePurchaseService = exports.createPurchaseService = exports.purchaseData = exports.getPurchaseService = exports.purchaseService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const purchaseService = async (limit) => {
    if (limit) {
        return await db_1.default.query.purchaseTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.purchaseTable.findMany();
};
exports.purchaseService = purchaseService;
const getPurchaseService = async (id) => {
    return await db_1.default.query.purchaseTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.purchaseTable.purchase_id, id)
    });
};
exports.getPurchaseService = getPurchaseService;
const purchaseData = async () => {
    return await db_1.default.query.purchaseTable.findMany({
        columns: {
            purchase_id: true,
            purchase_date: true,
            location_id: true,
            purchase_status: true,
            user_id: true,
            total_amount: true
        }, with: {
            transaction: {
                columns: {
                    purchase_id: true,
                    amount: true,
                    user_id: true,
                    status: true,
                    transaction_date: true,
                    transaction_id: true
                }
            },
            users: {
                columns: {
                    address: true,
                    contact_phone: true,
                    email: true,
                    full_name: true,
                    user_id: true
                }
            }
        }
    });
};
exports.purchaseData = purchaseData;
const createPurchaseService = async (purchase) => {
    await db_1.default.insert(schema_1.purchaseTable).values(purchase);
    return "purchase created successfully";
};
exports.createPurchaseService = createPurchaseService;
const updatePurchaseService = async (id, purchase) => {
    await db_1.default.update(schema_1.purchaseTable).set(purchase).where((0, drizzle_orm_1.eq)(schema_1.purchaseTable.purchase_id, id));
    return "purchase updated successfully";
};
exports.updatePurchaseService = updatePurchaseService;
const deletePurchaseService = async (id) => {
    await db_1.default.delete(schema_1.purchaseTable).where((0, drizzle_orm_1.eq)(schema_1.purchaseTable.purchase_id, id));
    return "purchase deleted successfully";
};
exports.deletePurchaseService = deletePurchaseService;
