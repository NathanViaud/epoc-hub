import type { BlobSize, PowOf2, SizeUnit } from "@nuxthub/core";

export async function getUserQuota(id: number) {
    const epocs = await useDrizzle().select().from(tables.epocs).where(eq(tables.epocs.user, id));

    let totalSize = 0;

    for (const epoc of epocs) {
        const file = await hubBlob().head(epoc.file);
        const size = file.size;
        totalSize += size;
    }

    return totalSize;
}

export function getMaxBlobSize(bytes: number): BlobSize {
    const units: SizeUnit[] = ["B", "KB", "MB", "GB"];
    const powOf2: PowOf2[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    const maxPow = powOf2.reduce((prev, curr) => {
        if (curr <= size) return curr;
        return prev;
    }, 1 as PowOf2);

    return `${maxPow}${units[unitIndex]}` as BlobSize;
}
