"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const hono_1 = require("hono");
const reviews_controller_1 = require("./reviews.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.reviewsRouter = new hono_1.Hono();
exports.reviewsRouter.get("/reviews", bearAuth_1.userAdminRoleAuth, reviews_controller_1.listReviews);
exports.reviewsRouter.get("/reviewsData", bearAuth_1.userAdminRoleAuth, reviews_controller_1.reviews);
exports.reviewsRouter.get("/reviews/:id", bearAuth_1.userAdminRoleAuth, reviews_controller_1.getReviews);
exports.reviewsRouter.post("/reviews", (0, zod_validator_1.zValidator)('json', validators_1.reviewsSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), bearAuth_1.userRoleAuth, reviews_controller_1.createReviews);
exports.reviewsRouter.put("/reviews/:id", bearAuth_1.userAdminRoleAuth, reviews_controller_1.updateReviews);
exports.reviewsRouter.delete("/reviews/:id", bearAuth_1.adminRoleAuth, reviews_controller_1.deleteReviews);
