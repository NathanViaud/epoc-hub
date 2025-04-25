import { epocInsertSchema } from "~/database/schema";

export default defineEventHandler(async (event) => {
    const { title, image, file } = await readValidatedBody(event, epocInsertSchema.parse);

    return useDrizzle().insert(tables.epocs).values({
        title,
        image,
        file,
    });
});
