import { registerSchema } from "~/database/schema";

export default eventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, registerSchema.parse);

    const user = await useDrizzle()
        .insert(tables.users)
        .values({
            email,
            passwordHash: await hashPassword(password),
        });

    await setUserSession(event, { user });
});
