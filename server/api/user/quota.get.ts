export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const role = await useDrizzle().select().from(tables.roles).where(eq(tables.roles.id, user.roleId)).get();

    return role ? role.quota : 0;
});
