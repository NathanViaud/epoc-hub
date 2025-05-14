export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const remainingQuota = await getRemainingQuota(user);
    const query = getQuery(event);

    const { uploadId } = query;
    const partSize = parseInt(getRequestHeader(event, "content-length") || "0", 10);

    const storage = useStorage("uploads");
    let currentTotalSize = Number(await storage.getItem(`upload:${user.id}:${uploadId}:size`));

    const newTotalSize = currentTotalSize + partSize;

    if (newTotalSize > remainingQuota) {
        throw createError({
            status: 413,
            message: `Upload exceeds remaining quota. Available: ${remainingQuota} bytes`,
        });
    }

    await storage.setItem(`upload:${user.id}:${uploadId}:size`, newTotalSize);

    const res = await hubBlob().handleMultipartUpload(event, {
        contentType: "application/octet-stream",
        prefix: `${user.id}/epocs/`,
    });

    if (res.action === "complete" || res.action === "abort") {
        storage.removeItem(`upload:${user.id}:${uploadId}:size`);
    }

    return res;
});
