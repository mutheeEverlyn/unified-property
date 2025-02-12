"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewsService = exports.updateReviewsService = exports.createReviewsService = exports.reviewsData = exports.getReviewsService = exports.reviewsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const reviewsService = async (limit) => {
    if (limit) {
        return await db_1.default.query.reviewsTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.reviewsTable.findMany();
};
exports.reviewsService = reviewsService;
const getReviewsService = async (id) => {
    return await db_1.default.query.reviewsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id)
    });
};
exports.getReviewsService = getReviewsService;
const reviewsData = async () => {
    return await db_1.default.query.reviewsTable.findMany({
        columns: {
            review_id: true,
            comment: true,
            rating: true,
            user_id: true,
            created_at: true,
        }, with: {
            vehicle: {
                columns: {
                    vehicle_id: true,
                    fuel_type: true,
                    exterior_image: true,
                    interior_image: true,
                    location_id: true,
                    seating_capacity: true,
                    transmission: true,
                    engine_capacity: true,
                    color: true,
                    history: true,
                    price: true,
                    model: true,
                    make: true
                }
            },
            house: {
                columns: {
                    exterior_image: true,
                    history: true,
                    house_id: true,
                    interior_image: true,
                    location_id: true,
                    number_of_bedrooms: true,
                    status: true,
                    type: true,
                    year_built: true,
                    price: true,
                    number_of_rooms: true
                }
            },
            land: {
                columns: {
                    land_id: true,
                    land_type: true,
                    size: true,
                    status: true,
                    image: true,
                    history: true,
                    location_id: true,
                    price: true
                }
            }
        }
    });
};
exports.reviewsData = reviewsData;
const createReviewsService = async (reviews) => {
    await db_1.default.insert(schema_1.reviewsTable).values(reviews);
    return "reviews created successfully";
};
exports.createReviewsService = createReviewsService;
const updateReviewsService = async (id, reviews) => {
    await db_1.default.update(schema_1.reviewsTable).set(reviews).where((0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id));
    return "reviews updated successfully";
};
exports.updateReviewsService = updateReviewsService;
const deleteReviewsService = async (id) => {
    await db_1.default.delete(schema_1.reviewsTable).where((0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id));
    return "reviews deleted successfully";
};
exports.deleteReviewsService = deleteReviewsService;
