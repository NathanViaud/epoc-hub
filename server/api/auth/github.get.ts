import { User } from "#auth-utils";

export default defineOAuthGitHubEventHandler({
    async onSuccess(event: any, { user }: { user: User }) {
        const { name, id, avatar_url } = user;

        let [dbUser] = await useDrizzle().select().from(tables.users).where(eq(tables.users.github_id, id)).limit(1);
        if (!dbUser) {
            console.log("user does not exist");
            [dbUser] = await useDrizzle()
                .insert(tables.users)
                .values({
                    name,
                    github_id: id,
                    avatarUrl: avatar_url,
                })
                .returning();
        }

        await setUserSession(event, { user: dbUser });
        return sendRedirect(event, "/");
    },
});
