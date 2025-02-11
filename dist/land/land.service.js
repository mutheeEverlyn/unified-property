"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLandService = exports.updateLandService = exports.createLandService = exports.landData = exports.getLandService = exports.landService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const landService = async (limit) => {
    if (limit) {
        return await db_1.default.query.landTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.landTable.findMany();
};
exports.landService = landService;
const getLandService = async (id) => {
    return await db_1.default.query.landTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.landTable.land_id, id)
    });
};
exports.getLandService = getLandService;
const landData = async () => {
    return await db_1.default.query.landTable.findMany({
        columns: {
            land_id: true,
            land_type: true,
            history: true,
            size: true,
            status: true,
            image: true,
            location_id: true,
            price: true,
            updated_at: true,
            created_at: true,
        }, with: {
            location: {
                columns: {
                    address: true,
                    contact_phone: true,
                    name: true
                }
            },
            reviews: {
                columns: {
                    comment: true,
                    rating: true,
                    user_id: true
                }
            },
            transactions: {
                columns: {
                    amount: true,
                    transaction_date: true,
                    transaction_id: true,
                    user_id: true
                }
            }
        }
    });
};
exports.landData = landData;
const createLandService = async (land) => {
    await db_1.default.insert(schema_1.landTable).values(land);
    return "land created successfully";
};
exports.createLandService = createLandService;
const updateLandService = async (id, land) => {
    await db_1.default.update(schema_1.landTable).set(land).where((0, drizzle_orm_1.eq)(schema_1.landTable.land_id, id));
    return "land updated successfully";
};
exports.updateLandService = updateLandService;
const deleteLandService = async (id) => {
    await db_1.default.delete(schema_1.landTable).where((0, drizzle_orm_1.eq)(schema_1.landTable.land_id, id));
    return "land deleted successfully";
};
exports.deleteLandService = deleteLandService;
