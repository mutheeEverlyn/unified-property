"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRelations = exports.purchaseRelations = exports.transactionsRelations = exports.locationRelations = exports.vehicleRelations = exports.landRelations = exports.houseRelations = exports.AuthOnUsersRelations = exports.reviewsTable = exports.transactionsTable = exports.purchaseTable = exports.vehiclesTable = exports.landTable = exports.housesTable = exports.locationTable = exports.AuthOnUsersTable = exports.usersTable = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "userAdminRoleAuth"]);
// Users Table
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    user_id: (0, pg_core_1.serial)("user_id").primaryKey(),
    full_name: (0, pg_core_1.text)("full_name"),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).unique(),
    contact_phone: (0, pg_core_1.text)("contact_phone"),
    address: (0, pg_core_1.text)("address"),
    role: (0, exports.roleEnum)("role").default("user"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Authentication Table
exports.AuthOnUsersTable = (0, pg_core_1.pgTable)("auth_on_users", {
    auth_id: (0, pg_core_1.serial)("auth_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    password: (0, pg_core_1.varchar)("password", { length: 100 }),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//locations and branches
exports.locationTable = (0, pg_core_1.pgTable)("location", {
    location_id: (0, pg_core_1.serial)("location_id").primaryKey(),
    address: (0, pg_core_1.varchar)("address").notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    contact_phone: (0, pg_core_1.text)("contact_phone"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Houses Table
exports.housesTable = (0, pg_core_1.pgTable)("houses", {
    house_id: (0, pg_core_1.serial)("house_id").primaryKey(),
    location_id: (0, pg_core_1.integer)("location_id").references(() => exports.locationTable.location_id, { onDelete: "cascade" }),
    number_of_rooms: (0, pg_core_1.integer)("number_of_rooms").notNull(),
    number_of_bedrooms: (0, pg_core_1.integer)("number_of_bedrooms").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    year_built: (0, pg_core_1.integer)("year_built"),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    type: (0, pg_core_1.varchar)("type", { length: 100 }).notNull(),
    exterior_image: (0, pg_core_1.text)("exterior_image"),
    interior_image: (0, pg_core_1.text)("interior_image"),
    history: (0, pg_core_1.text)("history"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Land Table
exports.landTable = (0, pg_core_1.pgTable)("land", {
    land_id: (0, pg_core_1.serial)("land_id").primaryKey(),
    location_id: (0, pg_core_1.integer)("location_id").references(() => exports.locationTable.location_id, { onDelete: "cascade" }),
    size: (0, pg_core_1.text)("size").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    land_type: (0, pg_core_1.varchar)("land_type", { length: 50 }).notNull(),
    image: (0, pg_core_1.text)("image"),
    history: (0, pg_core_1.text)("history"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Vehicles Table
exports.vehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    vehicle_id: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    make: (0, pg_core_1.varchar)("make", { length: 100 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 100 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    fuel_type: (0, pg_core_1.varchar)("fuel_type", { length: 50 }),
    engine_capacity: (0, pg_core_1.text)("engine_capacity"),
    transmission: (0, pg_core_1.text)("transmission"),
    seating_capacity: (0, pg_core_1.integer)("seating_capacity"),
    color: (0, pg_core_1.text)("color"),
    location_id: (0, pg_core_1.integer)("location_id").references(() => exports.locationTable.location_id, { onDelete: "cascade" }),
    exterior_image: (0, pg_core_1.text)("exterior_image"),
    interior_image: (0, pg_core_1.text)("interior_image"),
    history: (0, pg_core_1.text)("history"),
    created_at: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//purchase Table
exports.purchaseTable = (0, pg_core_1.pgTable)("purcahse", {
    purchase_id: (0, pg_core_1.serial)("purchase_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    purchase_date: (0, pg_core_1.timestamp)("purchase_date").notNull().defaultNow(),
    purchase_status: (0, pg_core_1.text)("purchase_status").default("pending"),
    location_id: (0, pg_core_1.integer)("location_id").notNull().references(() => exports.locationTable.location_id, { onDelete: "cascade" }),
    total_amount: (0, pg_core_1.integer)("total_amount").notNull()
});
// Transactions Table (covers all property types)
exports.transactionsTable = (0, pg_core_1.pgTable)("transactions", {
    transaction_id: (0, pg_core_1.serial)("transaction_id").primaryKey(),
    purchase_id: (0, pg_core_1.integer)("purchase_id").references(() => exports.purchaseTable.purchase_id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    amount: (0, pg_core_1.integer)("amount"),
    transaction_date: (0, pg_core_1.timestamp)("transaction_date").notNull().defaultNow(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).notNull(),
});
// Reviews Table (covers all property types)
exports.reviewsTable = (0, pg_core_1.pgTable)("reviews", {
    review_id: (0, pg_core_1.serial)("review_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.usersTable.user_id, { onDelete: "cascade" }),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.AuthOnUsersRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ one }) => ({
    user: one(exports.AuthOnUsersTable, {
        fields: [exports.usersTable.user_id],
        references: [exports.AuthOnUsersTable.user_id]
    }),
}));
// export const userRelations = relations(usersTable, ({ one,many }) => ({
//   reviews: many(reviewsTable),
//   transactions: many(transactionsTable)
// }));
exports.houseRelations = (0, drizzle_orm_1.relations)(exports.housesTable, ({ one, many }) => ({
    transactions: many(exports.transactionsTable),
    reviews: many(exports.reviewsTable),
    location: one(exports.locationTable, {
        fields: [exports.housesTable.location_id],
        references: [exports.locationTable.location_id]
    })
}));
exports.landRelations = (0, drizzle_orm_1.relations)(exports.landTable, ({ one, many }) => ({
    transactions: many(exports.transactionsTable),
    reviews: many(exports.reviewsTable),
    location: one(exports.locationTable, {
        fields: [exports.landTable.location_id],
        references: [exports.locationTable.location_id]
    })
}));
exports.vehicleRelations = (0, drizzle_orm_1.relations)(exports.vehiclesTable, ({ one, many }) => ({
    transactions: many(exports.transactionsTable),
    reviews: many(exports.reviewsTable),
    location: one(exports.locationTable, {
        fields: [exports.vehiclesTable.location_id],
        references: [exports.locationTable.location_id]
    })
}));
exports.locationRelations = (0, drizzle_orm_1.relations)(exports.locationTable, ({ many }) => ({
    houses: many(exports.housesTable),
    land: many(exports.landTable),
    vehicles: many(exports.vehiclesTable),
}));
exports.transactionsRelations = (0, drizzle_orm_1.relations)(exports.transactionsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.transactionsTable.user_id],
        references: [exports.usersTable.user_id]
    }),
    purchaseTable: one(exports.purchaseTable, {
        fields: [exports.transactionsTable.purchase_id],
        references: [exports.purchaseTable.purchase_id]
    }),
}));
exports.purchaseRelations = (0, drizzle_orm_1.relations)(exports.purchaseTable, ({ one, many }) => ({
    transaction: one(exports.transactionsTable, {
        fields: [exports.purchaseTable.purchase_id],
        references: [exports.transactionsTable.purchase_id]
    }),
    users: one(exports.usersTable, {
        fields: [exports.purchaseTable.user_id],
        references: [exports.usersTable.user_id]
    }),
}));
exports.reviewsRelations = (0, drizzle_orm_1.relations)(exports.reviewsTable, ({ many }) => ({
    users: many(exports.usersTable),
    house: many(exports.housesTable),
    land: many(exports.landTable),
    vehicle: many(exports.vehiclesTable),
}));
