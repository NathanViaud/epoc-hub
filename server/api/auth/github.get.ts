import { User } from "#auth-utils";

export default defineOAuthGitHubEventHandler({
    async onSuccess(event: any, { user }: { user: User }) {
        const { name, id, avatar_url } = user;

        let dbUser = await useDrizzle().select().from(tables.users).where(eq(tables.users.github_id, id)).get();
        if (!dbUser) {
            dbUser = await useDrizzle()
                .insert(tables.users)
                .values({
                    name,
                    github_id: id,
                    avatarUrl: avatar_url,
                })
                .returning()
                .get();
        }

        await setUserSession(event, { user: dbUser });
        return sendRedirect(event, "/");
    },
});
