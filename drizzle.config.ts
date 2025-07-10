import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./shared/database/schema.ts",
    out: "./shared/database/migrations",
});
