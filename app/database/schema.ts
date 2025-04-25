import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const epocs = sqliteTable("epocs", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    image: text("image").notNull(),
    file: text("file").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
});

export const epocInsertSchema = createInsertSchema(epocs);
