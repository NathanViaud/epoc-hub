import { BlobObject } from "@nuxthub/core";

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    try {
        // Check Content-Type header to ensure proper multipart/form-data
        const contentType = getRequestHeader(event, "content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
            throw createError({
                status: 400,
                message: "Invalid content type. Must be multipart/form-data",
            });
        }

        // Read form data with error handling
        const formData = await readMultipartFormData(event).catch((error) => {
            console.error("Error reading multipart form data:", error);
            throw createError({
                status: 400,
                message: "Failed to parse form data: " + (error.message || "Unknown error"),
            });
        });

        if (!formData || formData.length === 0) {
            throw createError({
                status: 400,
                message: "No form data received",
            });
        }

        // Setup data validation with proper error handling
        const validatedData = await validateFormData(formData).catch((error) => {
            console.error("Form data validation error:", error);
            throw createError({
                status: 400,
                message: "Invalid form data: " + (error.message || "Validation failed"),
            });
        });

        // Check quotas
        const usedQuota = await getUserUsedQuota(user.id);
        const userQuota = await getUserQuota(user);
        const remainingQuota = userQuota - usedQuota;

        const neededQuota = validatedData.file.data.length + (validatedData.thumbnail?.data.length || 0);

        if (neededQuota > remainingQuota) {
            throw createError({
                status: 402,
                message: "Files too large. Remaining quota: " + (remainingQuota / (1024 * 1024)).toFixed(2) + " MB",
            });
        }

        // Handle file upload with better error handling
        const uploadFilePromise = new Promise<BlobObject[]>((resolve, reject) => {
            try {
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
            } catch (error) {
                console.error("File upload error:", error);
                reject(
                    createError({
                        status: 500,
                        message: "Failed to upload file: " + (error.message || "Unknown error"),
                    }),
                );
            }
        });

        // Only attempt thumbnail upload if we have a thumbnail
        let uploadThumbnailPromise;
        if (validatedData.thumbnail) {
            uploadThumbnailPromise = new Promise<BlobObject[]>((resolve) => {
                try {
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
                } catch (error) {
                    console.error("Thumbnail upload error:", error);
                    // Don't fail the whole upload if just the thumbnail fails
                    resolve([]);
                }
            });
        } else {
            uploadThumbnailPromise = Promise.resolve([]);
        }

        // Process uploads
        const [file, thumbnail] = await Promise.all([uploadFilePromise, uploadThumbnailPromise]);

        if (!file || file.length === 0) {
            throw createError({
                status: 400,
                message: "No file was uploaded",
            });
        }

        // Insert into database
        return await useDrizzle()
            .insert(tables.epocs)
            .values({
                title: validatedData.title,
                image: thumbnail[0]?.pathname || null, // Use null instead of undefined
                file: file[0].pathname,
                user: user.id,
            });
    } catch (error) {
        // Add comprehensive error logging
        console.error("Upload handler error:", error);

        // Rethrow errors already created by createError
        if (error.status) throw error;

        // Handle unexpected errors
        throw createError({
            status: 500,
            message: "Server error: " + (error.message || "Unknown error"),
        });
    }
});
