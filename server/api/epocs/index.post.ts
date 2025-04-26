import { epocInsertSchema } from "~/database/schema";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const { title, image, file } = await readValidatedBody(event, epocInsertSchema.omit({ user: true }).parse);

    return useDrizzle().insert(tables.epocs).values({
        title,
        image,
        file,
        user: user.id,
    });
});
