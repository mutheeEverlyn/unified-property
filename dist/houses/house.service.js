"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHouseService = exports.updateHouseService = exports.createHouseService = exports.houseData = exports.getHouseService = exports.houseService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const houseService = async (limit) => {
    if (limit) {
        return await db_1.default.query.housesTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.housesTable.findMany();
};
exports.houseService = houseService;
const getHouseService = async (id) => {
    return await db_1.default.query.housesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.housesTable.house_id, id)
    });
};
exports.getHouseService = getHouseService;
const houseData = async () => {
    return await db_1.default.query.housesTable.findMany({
        columns: {
            house_id: true,
            exterior_image: true,
            interior_image: true,
            history: true,
            number_of_bedrooms: true,
            location_id: true,
            type: true,
            number_of_rooms: true,
            year_built: true,
            status: true,
            price: true,
            updated_at: true,
            created_at: true,
        }, with: {
            location: {
                columns: {
                    address: true,
                    contact_phone: true,
                    location_id: true,
                    name: true
                }
            },
            reviews: {
                columns: {
                    comment: true,
                    created_at: true,
                    rating: true,
                    review_id: true,
                    user_id: true
                }
            },
            transactions: {
                columns: {
                    amount: true,
                    status: true,
                    transaction_date: true,
                    transaction_id: true,
                    user_id: true
                }
            }
        }
    });
};
exports.houseData = houseData;
const createHouseService = async (house) => {
    await db_1.default.insert(schema_1.housesTable).values(house);
    return "house created successfully";
};
exports.createHouseService = createHouseService;
const updateHouseService = async (id, house) => {
    await db_1.default.update(schema_1.housesTable).set(house).where((0, drizzle_orm_1.eq)(schema_1.housesTable.house_id, id));
    return "house updated successfully";
};
exports.updateHouseService = updateHouseService;
const deleteHouseService = async (id) => {
    await db_1.default.delete(schema_1.housesTable).where((0, drizzle_orm_1.eq)(schema_1.housesTable.house_id, id));
    return "house deleted successfully";
};
exports.deleteHouseService = deleteHouseService;
