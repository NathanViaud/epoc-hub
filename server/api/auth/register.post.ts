import { registerSchema } from "~/database/schema";

export default eventHandler(async (event) => {
    const { email, password, name } = await readValidatedBody(event, registerSchema.parse);

    const matches = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email)).all();
    if (matches.length > 0) {
        throw createError({ status: 409, message: "Email already exists" });
    }

    const user = await useDrizzle()
        .insert(tables.users)
        .values({
            email,
            passwordHash: await hashPassword(password),
            name,
        })
        .returning()
        .get();

    await setUserSession(event, { user });
});
