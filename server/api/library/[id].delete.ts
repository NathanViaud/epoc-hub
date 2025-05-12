import { z } from "zod";

const routeSchema = z.object({
    id: z.string(),
});

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { id } = await getValidatedRouterParams(event, routeSchema.parse);

    return useDrizzle()
        .delete(tables.libraries)
        .where(and(eq(tables.libraries.id, id), eq(tables.libraries.user, user.id)));
});
