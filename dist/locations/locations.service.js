"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.createLocationService = exports.locationData = exports.getLocationService = exports.locationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const locationService = async (limit) => {
    if (limit) {
        return await db_1.default.query.locationTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.locationTable.findMany();
};
exports.locationService = locationService;
const getLocationService = async (id) => {
    return await db_1.default.query.locationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locationTable.location_id, id)
    });
};
exports.getLocationService = getLocationService;
const locationData = async () => {
    return await db_1.default.query.locationTable.findMany({
        columns: {
            location_id: true,
            address: true,
            contact_phone: true,
            name: true,
            updated_at: true,
            created_at: true,
        }, with: {
            houses: {
                columns: {
                    created_at: true,
                    house_id: true,
                    number_of_rooms: true,
                    exterior_image: true,
                    interior_image: true,
                    number_of_bedrooms: true,
                    price: true,
                    history: true,
                    status: true,
                    type: true,
                    year_built: true
                }
            },
            land: {
                columns: {
                    land_id: true,
                    land_type: true,
                    price: true,
                    location_id: true,
                    size: true
                }
            },
            vehicles: {
                columns: {
                    location_id: true,
                    make: true,
                    interior_image: true,
                    exterior_image: true,
                    vehicle_id: true,
                    year: true,
                    status: true,
                    seating_capacity: true,
                    transmission: true,
                    engine_capacity: true,
                    fuel_type: true,
                    color: true,
                    history: true,
                    price: true,
                    model: true
                }
            }
        }
    });
};
exports.locationData = locationData;
const createLocationService = async (location) => {
    await db_1.default.insert(schema_1.locationTable).values(location);
    return "location created successfully";
};
exports.createLocationService = createLocationService;
const updateLocationService = async (id, location) => {
    await db_1.default.update(schema_1.locationTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.locationTable.location_id, id));
    return "location updated successfully";
};
exports.updateLocationService = updateLocationService;
const deleteLocationService = async (id) => {
    await db_1.default.delete(schema_1.locationTable).where((0, drizzle_orm_1.eq)(schema_1.locationTable.location_id, id));
    return "location deleted successfully";
};
exports.deleteLocationService = deleteLocationService;
