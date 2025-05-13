import { getRemainingQuota } from "~~/server/utils/files";

export default eventHandler(async (event) => {
    console.log("file upload");
    const { user } = await requireUserSession(event);

    const body = await readMultipartFormData(event);

    if (!body || !body[0]) {
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
            types: ["application/octet-stream"],
        },
        put: {
            prefix: `${user.id}/epocs/`,
        },
    });
});
