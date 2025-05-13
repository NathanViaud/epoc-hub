export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const body = await readMultipartFormData(event);

    if (!body || !body[0]) {
        console.log("no file provided");
        throw createError({
            status: 400,
            message: "No file provided",
        });
    }

    const fileSize = body[0].data.length;

    const remainingQuota = await getRemainingQuota(user);

    if (fileSize > remainingQuota) {
        throw createError({
            status: 413,
            message: `Upload exceeds remaining quota. Available: ${remainingQuota} bytes, Required: ${fileSize} bytes`,
        });
    }

    return hubBlob().handleUpload(event, {
        multiple: false,
        ensure: {
            types: ["image"],
        },
        put: {
            prefix: `${user.id}/images/`,
        },
    });
});
