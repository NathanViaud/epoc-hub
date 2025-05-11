export default eventHandler(async (event) => {
    const { pathname } = getRouterParams(event);

    await useDrizzle()
        .update(tables.epocs)
        .set({
            downloads: sql`${tables.epocs.downloads} + 1`,
        })
        .where(eq(tables.epocs.file, pathname));

    return hubBlob().serve(event, pathname);
});
