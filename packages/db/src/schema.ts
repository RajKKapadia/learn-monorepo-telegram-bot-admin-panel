import {
    pgTable,
    serial,
    text,
    timestamp,
    bigint,
    integer
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    telegramId: bigint("telegram_id", { mode: "number" }).notNull().unique(),
    username: text("username"),
    firstName: text("first_name"),
    lastName: text("last_name"),

    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const foodLogs = pgTable("food_logs", {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
        .notNull()
        .references(() => users.id),

    foodName: text("food_name").notNull(),
    calories: integer("calories").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull()
});
