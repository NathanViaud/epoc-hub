import { userUpdateSchema } from "#shared/database/schema";

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const { name } = await readValidatedBody(event, userUpdateSchema.parse);

    const newUser = await useDrizzle()
        .update(tables.users)
        .set({ name })
        .where(eq(tables.users.id, user.id))
        .returning()
        .get();
    await replaceUserSession(event, { user: newUser });

    return newUser;
});
