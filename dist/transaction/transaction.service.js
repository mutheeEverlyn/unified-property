"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionsService = exports.updateTransactionsService = exports.createTransactionsService = exports.transactionsData = exports.getTransactionsService = exports.transactionsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const transactionsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.transactionsTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.transactionsTable.findMany();
};
exports.transactionsService = transactionsService;
const getTransactionsService = async (id) => {
    return await db_1.default.query.transactionsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.transactionsTable.transaction_id, id)
    });
};
exports.getTransactionsService = getTransactionsService;
const transactionsData = async () => {
    return await db_1.default.query.transactionsTable.findMany({
        columns: {
            transaction_id: true,
            purchase_id: true,
            user_id: true,
            amount: true,
            status: true,
            transaction_date: true
        }, with: {
            purchaseTable: {
                columns: {
                    purchase_id: true,
                    purchase_date: true,
                    location_id: true,
                    purchase_status: true,
                    user_id: true,
                    total_amount: true
                }
            },
            user: {
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
exports.transactionsData = transactionsData;
const createTransactionsService = async (transactions) => {
    await db_1.default.insert(schema_1.transactionsTable).values(transactions);
    return "transactions created successfully";
};
exports.createTransactionsService = createTransactionsService;
const updateTransactionsService = async (id, transactions) => {
    await db_1.default.update(schema_1.transactionsTable).set(transactions).where((0, drizzle_orm_1.eq)(schema_1.transactionsTable.transaction_id, id));
    return "transactions updated successfully";
};
exports.updateTransactionsService = updateTransactionsService;
const deleteTransactionsService = async (id) => {
    await db_1.default.delete(schema_1.transactionsTable).where((0, drizzle_orm_1.eq)(schema_1.transactionsTable.transaction_id, id));
    return "transactions deleted successfully";
};
exports.deleteTransactionsService = deleteTransactionsService;
