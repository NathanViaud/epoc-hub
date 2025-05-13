import { BlobObject } from "@nuxthub/core";

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const formData = await readMultipartFormData(event);
    if (!formData) {
        throw createError({ status: 400 });
    }

    const validatedData = await validateFormData(formData);

    const usedQuota = await getUserUsedQuota(user.id);
    const userQuota = await getUserQuota(user);
    const remainingQuota = userQuota - usedQuota;

    if (validatedData.file.data.length + (validatedData.thumbnail?.data.length || 0) > remainingQuota) {
        throw createError({ status: 402, message: "Files too large" });
    }

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

    return useDrizzle()
        .insert(tables.epocs)
        .values({
            title: validatedData.title,
            image: thumbnail[0]?.pathname || undefined,
            file: file[0].pathname,
            user: user.id,
        });
});
