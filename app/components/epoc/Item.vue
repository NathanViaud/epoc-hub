<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { BlobObject } from "@nuxthub/core";

const props = defineProps<{
    id?: number;
    title: string;
    image?: string;
    path?: string;
    downloads?: number;
    libraryMode?: boolean;
    preview?: boolean;
}>();

const emit = defineEmits<{
    (e: "deleted", id: number): void;
}>();

const { data: metadata } = props.preview ? { data: undefined } : await useFetch<BlobObject>(`/api/files/${props.path}`);

const baseUrl = ref("");
onMounted(() => {
    baseUrl.value = `${window.location.origin}`;
});

const qrCodeComponent = useTemplateRef("qrCodeComponent");
function downloadQRCode() {
    if (!qrCodeComponent.value || !qrCodeComponent.value.qrCode) return;

    qrCodeComponent.value.qrCode.download({
        name: props.title + "_qr-code.png",
        extension: "png",
    });
}

const toast = useToast();
const menu: Ref<DropdownMenuItem[][]> = ref([
    [
        {
            label: "Download",
            icon: "i-lucide-download",
            to: `/files/${props.path}`,
            external: true,
        },
        {
            label: "Copy link",
            icon: "i-lucide-copy",
            onClick: async () => {
                await navigator.clipboard.writeText(`${baseUrl.value}/files/${props.path}`);
                toast.add({ title: "Success", description: "Link copied to clipboard", color: "success" });
            },
        },
    ],
]);
if (!props.libraryMode) {
    menu.value.push([
        {
            label: "Delete",
            icon: "i-lucide-trash",
            color: "error",
            onClick: async () => {
                try {
                    await $fetch(`/api/epocs/${props.id}`, {
                        method: "DELETE",
                    });
                    toast.add({ title: "Success", description: "ePoc deleted successfully", color: "success" });
                    emit("deleted", props.id!);
                } catch (error) {
                    console.error(error);
                    toast.add({ title: "Error", description: "Failed to delete ePoc", color: "error" });
                }
            },
        },
    ]);
}
</script>

<template>
    <UCard :ui="{ body: 'p-0! h-full flex flex-col' }" class="overflow-hidden">
        <img v-if="image" :src="image" alt="Thumbnail" class="w-full aspect-square object-cover" />
        <img
            v-else
            src="/placeholder.png"
            alt="Default thumbnail"
            class="w-full aspect-square object-cover dark:invert p-4"
        />

        <div class="p-4 flex flex-col flex-1 gap-4">
            <div>
                <h2 class="font-semibold">{{ title }}</h2>
                <div class="flex justify-between">
                    <span v-if="metadata" class="text-muted">{{ getSizeString(metadata.size) }}</span>
                    <span v-if="downloads !== undefined" class="text-muted items-center flex gap-1">
                        <UIcon name="i-lucide-download" />
                        {{ downloads }}
                    </span>
                </div>
            </div>

            <div v-if="path" class="flex gap-2 mt-auto">
                <UModal>
                    <UButton block label="QR Code" icon="i-lucide-qr-code" />

                    <template #content>
                        <UCard>
                            <template #header>
                                <h2>QR Code</h2>
                            </template>
                            <EpocQRCode ref="qrCodeComponent" :link="`${baseUrl}/files/${path}`" />
                            <template #footer>
                                <div class="flex gap-2">
                                    <UButton @click="downloadQRCode" block label="Download" icon="i-lucide-download" />
                                </div>
                            </template>
                        </UCard>
                    </template>
                </UModal>
                <UDropdownMenu :items="menu">
                    <UButton icon="i-lucide-ellipsis" variant="ghost" />
                </UDropdownMenu>
            </div>
        </div>
    </UCard>
</template>
