import { drizzle } from "drizzle-orm/d1";
export { sql, eq, and, or } from "drizzle-orm";

import * as schema from "~/database/schema";

export const tables = schema;

export function useDrizzle() {
    return drizzle(hubDatabase(), { schema });
}

export type Epoc = typeof schema.epocs.$inferSelect;
export type Role = typeof schema.roles.$inferSelect;
