export async function getUserQuota(id: number) {
    const epocs = await useDrizzle().select().from(tables.epocs).where(eq(tables.epocs.user, id));

    let totalSize = 0;

    for (const epoc of epocs) {
        const file = await hubBlob().head(epoc.file);
        const size = file.size;
        totalSize += size;
    }

    return totalSize;
}
