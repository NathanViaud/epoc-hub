import { loginSchema } from "~/database/schema";

export default eventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, loginSchema.parse);

    const [user] = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email));

    if (!user || !user.passwordHash) {
        throw createError({ status: 404, message: "Invalid credentials" });
    }

    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
        throw createError({ status: 404, message: "Invalid credentials" });
    }

    await setUserSession(event, { user });
});
