export async function getUserQuota(id: string) {
    const { blobs } = await hubBlob().list({ prefix: id });

    return blobs.reduce((acc, blob) => acc + blob.size, 0);
}
