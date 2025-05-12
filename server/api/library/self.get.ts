export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    return useDrizzle().select().from(tables.libraries).where(eq(tables.libraries.user, user.id)).get();
});
