export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const { blobs } = await hubBlob().list({ prefix: user.id });
    const epocs = await useDrizzle().select().from(tables.epocs).where(eq(tables.epocs.user, user.id));

    const epocFiles = epocs.map((epoc) => epoc.file);
    const epocImages = epocs.map((epoc) => epoc.image);

    let deleted = 0;
    for (const blob of blobs) {
        if (!epocFiles.includes(blob.pathname) && !epocImages.includes(blob.pathname)) {
            await hubBlob().delete(blob.pathname);
            deleted++;
        }
    }

    return {
        success: true,
        deleted,
    };
});
