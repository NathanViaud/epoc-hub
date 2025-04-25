export default eventHandler(async (event) => {
    return await hubBlob().handleUpload(event, {
        formKey: "files",
        multiple: false,
        ensure: {
            types: ["application/octet-stream"],
        },
    });
});
