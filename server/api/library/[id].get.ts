import { z } from "zod";

const routeSchema = z.object({
    id: z.string(),
});

export default eventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, routeSchema.parse);

    const library = await useDrizzle().select().from(tables.libraries).where(eq(tables.libraries.id, id)).get();
    if (!library) {
        throw createError({ status: 400 });
    }

    return useDrizzle().select().from(tables.epocs).where(eq(tables.epocs.user, library.user));
});
