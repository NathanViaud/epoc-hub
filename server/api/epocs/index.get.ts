import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    return useDrizzle().select().from(tables.epocs).where(eq(tables.epocs.user, user.id));
});
