"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehiclesService = exports.updateVehiclesService = exports.createVehiclesService = exports.vehiclesData = exports.getVehiclesService = exports.vehiclesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const vehiclesService = async (limit) => {
    if (limit) {
        return await db_1.default.query.vehiclesTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.vehiclesTable.findMany();
};
exports.vehiclesService = vehiclesService;
const getVehiclesService = async (id) => {
    return await db_1.default.query.vehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id)
    });
};
exports.getVehiclesService = getVehiclesService;
const vehiclesData = async () => {
    return await db_1.default.query.vehiclesTable.findMany({
        columns: {
            vehicle_id: true,
            fuel_type: true,
            exterior_image: true,
            make: true,
            color: true,
            engine_capacity: true,
            history: true,
            interior_image: true,
            seating_capacity: true,
            status: true,
            transmission: true,
            location_id: true,
            model: true,
            price: true,
            year: true,
            updated_at: true,
            created_at: true,
        }, with: {
            location: {
                columns: {
                    address: true,
                    contact_phone: true,
                    name: true,
                    location_id: true
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
                    purchase_id: true,
                    status: true,
                    transaction_date: true,
                    user_id: true,
                    transaction_id: true
                }
            }
        }
    });
};
exports.vehiclesData = vehiclesData;
const createVehiclesService = async (vehicle) => {
    await db_1.default.insert(schema_1.vehiclesTable).values(vehicle);
    return "vehicle created successfully";
};
exports.createVehiclesService = createVehiclesService;
const updateVehiclesService = async (id, vehicle) => {
    await db_1.default.update(schema_1.vehiclesTable).set(vehicle).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "vehicle updated successfully";
};
exports.updateVehiclesService = updateVehiclesService;
const deleteVehiclesService = async (id) => {
    await db_1.default.delete(schema_1.vehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "vehicle deleted successfully";
};
exports.deleteVehiclesService = deleteVehiclesService;
