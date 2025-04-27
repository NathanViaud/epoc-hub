export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const role = await useDrizzle().select().from(tables.roles).where(eq(tables.roles.id, user.roleId)).get();
    if (!role) throw new Error("User role not found");
    const { quota: userQuota } = role;

    const usedQuota = await getUserQuota(user.id);
    const remainingQuota = userQuota - usedQuota;

    const body = await readMultipartFormData(event);
    if (!body || !body[0]) {
        throw createError({
            status: 400,
            message: "No file provided",
        });
    }

    const fileSize = body[0].data.length;
    if (fileSize > remainingQuota) {
        throw createError({
            status: 413,
            message: `Upload exceeds remaining quota. Available: ${remainingQuota} bytes, Required: ${fileSize} bytes`,
        });
    }

    return await hubBlob().handleUpload(event, {
        formKey: "files",
        multiple: false,
        ensure: {
            types: ["application/octet-stream"],
        },
        put: {
            prefix: `${user.id}/epocs/`,
        },
    });
});
