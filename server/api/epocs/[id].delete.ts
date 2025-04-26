export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));
    const { user } = await requireUserSession(event);

    const [deletedEpoc] = await useDrizzle()
        .delete(tables.epocs)
        .where(and(eq(tables.epocs.id, id), eq(tables.epocs.user, user.id)))
        .returning();

    await hubBlob().del(deletedEpoc.file);
    await hubBlob().del(deletedEpoc.image);
});
