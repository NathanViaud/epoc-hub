import { z } from "zod";

const bodySchema = z.object({
    title: z.string(),
    file: z.string(),
    image: z.string().optional(),
});

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { title, file, image } = await readValidatedBody(event, bodySchema.parse);

    return useDrizzle()
        .insert(tables.epocs)
        .values({
            title,
            image,
            file,
            user: user.id,
        })
        .onConflictDoUpdate({
            target: tables.epocs.file,
            set: { title, image },
        });
});
