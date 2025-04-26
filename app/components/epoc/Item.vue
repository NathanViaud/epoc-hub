<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
    id: number;
    title: string;
    image: string;
    file?: string;
}>();

const emit = defineEmits<{
    (e: "deleted", id: number): void;
}>();

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
            to: props.file,
            external: true,
        },
    ],
    [
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
                    emit("deleted", props.id);
                } catch (error) {
                    console.error(error);
                    toast.add({ title: "Error", description: "Failed to delete ePoc", color: "error" });
                }
            },
        },
    ],
]);
</script>

<template>
    <UCard :ui="{ header: 'p-0!', body: 'border-b-0' }" class="overflow-hidden">
        <template #header>
            <img :src="image" alt="ePoc image" class="w-full aspect-square" />
        </template>
        <h2 class="font-semibold flex-1">{{ title }}</h2>

        <template v-if="file" #footer>
            <div class="flex gap-2 mt-auto">
                <UModal>
                    <UButton block label="QR Code" icon="i-lucide-qr-code" />

                    <template #content>
                        <UCard>
                            <template #header>
                                <h2>QR Code</h2>
                            </template>
                            <EpocQRCode ref="qrCodeComponent" :link="baseUrl + file" />
                            <template #footer>
                                <div class="flex gap-2">
                                    <UButton @click="downloadQRCode" block label="Download" icon="i-lucide-download" />
                                    <!-- <UButton block label="Share" icon="i-lucide-share" /> -->
                                </div>
                            </template>
                        </UCard>
                    </template>
                </UModal>

                <UDropdownMenu :items="menu">
                    <UButton icon="i-lucide-ellipsis" variant="subtle" color="neutral" />
                </UDropdownMenu>
            </div>
        </template>
    </UCard>
</template>
