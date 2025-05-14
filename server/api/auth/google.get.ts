export default defineOAuthGoogleEventHandler({
    async onSuccess(event: any, { user }: { user: any }) {
        const { sub, name, picture } = user;

        let dbUser = await useDrizzle().select().from(tables.users).where(eq(tables.users.google_id, sub)).get();
        if (!dbUser) {
            dbUser = await useDrizzle()
                .insert(tables.users)
                .values({
                    name,
                    google_id: sub,
                    avatarUrl: picture,
                })
                .returning()
                .get();
        }

        await setUserSession(event, { user: dbUser });
        return sendRedirect(event, "/files");
    },
});
