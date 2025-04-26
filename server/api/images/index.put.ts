export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    return await hubBlob().handleUpload(event, {
        formKey: "files",
        multiple: false,
        ensure: {
            types: ["image"],
        },
        put: {
            prefix: `${user.id}/images/`,
        },
    });
});
