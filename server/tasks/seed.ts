export default defineTask({
    meta: {
        name: "db:seed",
        description: "Run database seed task",
    },
    async run() {
        console.log("Running database seed task...");

        await useDrizzle()
            .insert(tables.roles)
            .values([
                {
                    id: 1,
                    name: "Free",
                    quota: 1024 * 1024 * 50, // 50 MB
                },
            ]);

        return { result: "success" };
    },
});
