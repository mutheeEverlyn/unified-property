import { pgTable, pgEnum, serial, text, integer, timestamp, varchar,decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "user", "userAdminRoleAuth"]);

// Users Table
export const usersTable = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  full_name: text("full_name"),
  email: varchar("email", { length: 255 }).unique(),
  contact_phone: text("contact_phone"),
  address: text("address"),
  role: roleEnum("role").default("user"),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
// Authentication Table
export const AuthOnUsersTable = pgTable("auth_on_users", {
    auth_id: serial("auth_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => usersTable.user_id, { onDelete: "cascade" }),
    password: varchar("password", { length: 100 }),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });

  // Houses Table
  export const housesTable = pgTable("houses", {
    house_id: serial("house_id").primaryKey(),
    owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
    address: varchar("address").references(() => locationTable.address, { onDelete: "set null" }),
    name: varchar("name_of_House", { length: 255 }).notNull(),
    number_of_rooms: integer("number_of_rooms").notNull(),
    size: integer("size").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    year_built: integer("year_built"),
    image: text("image"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });

 //locations and branches
  export const locationTable = pgTable("location", {
    // location_id:integer("location_id"),
    address: serial("address").primaryKey(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    zip_code: varchar("zip_code", { length: 10 }).notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });

   // Land Table
   export const landTable = pgTable("land", {
    land_id: serial("land_id").primaryKey(),
    owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
    location: varchar("location").references(() => locationTable.address, { onDelete: "set null" }),
    size: integer("size").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    land_type: varchar("land_type", { length: 50 }).notNull(),
    image: text("image"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  });
  
    // Vehicles Table
    export const vehiclesTable = pgTable("vehicles", {
      vehicle_id: serial("vehicle_id").primaryKey(),
      owner_id: integer("owner_id").references(() => usersTable.user_id, { onDelete: "set null" }),
      make: varchar("make", { length: 100 }).notNull(),
      model: varchar("model", { length: 100 }).notNull(),
      year: integer("year").notNull(),
      vin: varchar("vin", { length: 100 }).unique().notNull(),
      status: varchar("status", { length: 50 }).notNull(),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      mileage: integer("mileage").notNull(),
      fuel_type: varchar("fuel_type", { length: 50 }),
      location: varchar("location").references(() => locationTable.address, { onDelete: "set null" }),
      image: text("image"),
      created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
      updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    });

// Property History Table (covers all property types)
export const historyTable = pgTable("history", {
  history_id: serial("history_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  event: varchar("event", { length: 255 }).notNull(),
  event_date: timestamp("event_date",{mode:"string"}).notNull().defaultNow(),
  description: text("description"),
});

 //Bookings Table
 export const bookingsTable = pgTable("bookings", {
  booking_id: serial("booking_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  booking_date: timestamp("booking_date").notNull().defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),// confirmed, pending, cancelled
});

 // Transactions Table (covers all property types)
 export const transactionsTable = pgTable("transactions", {
  transaction_id: serial("transaction_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  booking_id: integer("booking_id").references(() => bookingsTable.booking_id, { onDelete: "set null" }),
  buyer_id: integer("buyer_id").references(() => usersTable.user_id, { onDelete: "set null" }),
  sale_price: decimal("sale_price", { precision: 10, scale: 2 }).notNull(),
  transaction_date: timestamp("transaction_date").notNull().defaultNow(),
  status: varchar("status", { length: 50 }).notNull(),
});

 // Reviews Table (covers all property types)
 export const reviewsTable = pgTable("reviews", {
  review_id: serial("review_id").primaryKey(),
  property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  property_id: integer("property_id").notNull(),
  user_id: integer("user_id").references(() => usersTable.user_id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

  export const AuthOnUsersRelations = relations(usersTable, ({ one }) => ({
    user: one(AuthOnUsersTable, {
        fields: [usersTable.user_id],
        references: [AuthOnUsersTable.user_id]
    })
  }));

  export const userRelations = relations(usersTable, ({ one,many }) => ({
    reviews: many(reviewsTable),
    transactions: many(transactionsTable)
  }));

  export const houseRelations = relations(housesTable, ({one, many }) => ({
    history: many(historyTable),
    transactions: many(transactionsTable),
    reviews: many(reviewsTable),
    location: one(locationTable)
  }));

  export const landRelations = relations(landTable, ({ one,many }) => ({
    history: many(historyTable),
    transactions: many(transactionsTable),
    reviews: many(reviewsTable),
    location: one(locationTable)
  }));

  export const vehicleRelations = relations(vehiclesTable, ({ one,many }) => ({
    history: many(historyTable),
    transactions: many(transactionsTable),
    reviews: many(reviewsTable),
    location: one(locationTable)
  }));

  export const locationBranchesRelations = relations(locationTable, ({ many }) => ({
    houses: many(housesTable),
    land: many(landTable),
    vehicles: many(vehiclesTable),
  }));
  
  export const transactionsRelations = relations(transactionsTable, ({ one }) => ({
    buyer: one(usersTable),
    bookingsTable: one(bookingsTable),
  }));

  export const bookingsRelations = relations(bookingsTable, ({ one,many }) => ({
    transaction: one(transactionsTable),
    users: one(usersTable),
  }));

  export const historyRelations = relations(historyTable, ({ many }) => ({
    house: many(housesTable),
    land: many(landTable),
    vehicle: many(vehiclesTable),
  }));

  export const reviewsRelations = relations(reviewsTable, ({ many }) => ({
    users: many(usersTable),
    house: many(housesTable),
    land: many(landTable),
    vehicle: many(vehiclesTable),
  }));

  export type tiUsers = typeof usersTable.$inferInsert;
  export type tsUsers = typeof usersTable.$inferSelect;
  export type tiAuthOnUsers = typeof AuthOnUsersTable.$inferInsert;
  export type tsAuthOnUsers = typeof AuthOnUsersTable.$inferSelect;
  export type tiHouses = typeof housesTable.$inferInsert;
  export type tsHouses = typeof housesTable.$inferSelect;
  export type tiLand = typeof landTable.$inferInsert;
  export type tsLand = typeof landTable.$inferSelect;
  export type tiVehicles = typeof vehiclesTable.$inferInsert;
  export type tsVehicles = typeof vehiclesTable.$inferSelect;
  export type tiLocation = typeof locationTable.$inferInsert;
  export type tsLocation = typeof locationTable.$inferSelect;
  export type tiHistory = typeof historyTable.$inferInsert;
  export type tsHistory = typeof historyTable.$inferSelect;
  export type tiTransactions = typeof transactionsTable.$inferInsert;
  export type tsTransactions = typeof transactionsTable.$inferSelect;
  export type tiBookings = typeof bookingsTable.$inferInsert;
  export type tsBookings = typeof bookingsTable.$inferSelect;
  export type tiReviews = typeof reviewsTable.$inferInsert;
  export type tsReviews = typeof reviewsTable.$inferSelect;

  // import {
  //   integer,
  //   pgEnum,
  //   pgTable,
  //   serial,
  //   varchar,
  //   boolean,
  //   timestamp,
  //   uuid,
  //   text,
  //   decimal,
  // } from "drizzle-orm/pg-core";
  // import { relations } from "drizzle-orm";
  
 
  // // Property Media Table (new addition)
  // export const propertyMediaTable = pgTable("property_media", {
  //   media_id: serial("media_id").primaryKey(),
  //   property_type: varchar("property_type", { length: 50 }).notNull(), // 'house', 'land', or 'vehicle'
  //   property_id: integer("property_id").notNull(),
  //   url: text("url").notNull(),
  //   description: text("description"),
  //   created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  // });
  
