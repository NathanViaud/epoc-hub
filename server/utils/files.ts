import type { User } from "#auth-utils";
import type { MultiPartData } from "h3";
import { z } from "zod";

export async function getUserUsedQuota(id: string) {
    const { blobs } = await hubBlob().list({ prefix: id });

    return blobs.reduce((acc, blob) => acc + blob.size, 0);
}

export async function getUserQuota(user: User) {
    const role = await useDrizzle().select().from(tables.roles).where(eq(tables.roles.id, user.roleId)).get();
    if (!role) {
        throw createError({ status: 400 });
    }

    return role.quota;
}

const uploadSchema = z.object({
    title: z.string().min(1),
    thumbnail: z
        .object({
            data: z.instanceof(Buffer).refine((buffer) => buffer.length > 0),
            filename: z.string().optional(),
            type: z.string().startsWith("image/"),
        })
        .optional(),
    file: z.object({
        data: z.instanceof(Buffer).refine((buffer) => buffer.length > 0),
        filename: z.string().optional(),
        type: z.string().startsWith("application/octet-stream"),
    }),
});

export async function getRemainingQuota(user: User) {
    const userQuota = await getUserQuota(user);
    const usedQuota = await getUserUsedQuota(user.id);

    return userQuota - usedQuota;
}

export type Upload = z.infer<typeof uploadSchema>;

export async function validateFormData(formData: MultiPartData[]): Promise<Upload> {
    const parsedData: Partial<Upload> = {
        thumbnail: undefined,
        title: undefined,
    };

    formData.forEach((part) => {
        if (part.name === "thumbnail") {
            parsedData.thumbnail = (part as Upload["thumbnail"]) || undefined;
        } else if (part.name === "title") {
            parsedData.title = part.data.toString();
        }
    });

    try {
        return uploadSchema.parse(parsedData);
    } catch (e) {
        console.error(e);
        throw createError({ status: 400 });
    }
}
