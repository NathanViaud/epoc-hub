export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    return useDrizzle().insert(tables.libraries).values({
        user: user.id,
    });
});
