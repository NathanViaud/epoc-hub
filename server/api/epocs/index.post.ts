import { BlobObject } from "@nuxthub/core";

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const formData = await readMultipartFormData(event);
    if (!formData) {
        throw createError({ status: 400 });
    }

    const validatedData = await validateFormData(formData);

    const uploadFilePromise: Promise<BlobObject[]> = new Promise((resolve, reject) => {
        resolve(
            hubBlob().handleUpload(event, {
                formKey: "file",
                multiple: false,
                ensure: {
                    types: ["application/octet-stream"],
                },
                put: {
                    prefix: `${user.id}/epocs/`,
                },
            }),
        );
    });

    const uploadThumbnailPromise: Promise<BlobObject[]> = new Promise((resolve) => {
        resolve(
            hubBlob().handleUpload(event, {
                formKey: "thumbnail",
                multiple: false,
                ensure: {
                    types: ["image"],
                },
                put: {
                    prefix: `${user.id}/images/`,
                },
            }),
        );
    });

    const [file, thumbnail] = await Promise.all([uploadFilePromise, uploadThumbnailPromise]);

    return useDrizzle().insert(tables.epocs).values({
        title: validatedData.title,
        image: thumbnail[0].pathname,
        file: file[0].pathname,
        user: user.id,
    });
});
