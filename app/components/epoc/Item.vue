<script setup lang="ts">
const props = defineProps<{
    title: string;
    image: string;
    file?: string;
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
</script>

<template>
    <UCard :ui="{ header: 'p-0!', body: 'border-b-0' }" class="overflow-hidden">
        <template #header>
            <img :src="image" alt="ePoc image" class="w-full aspect-square" />
        </template>
        <h2 class="font-semibold flex-1">{{ title }}</h2>

        <template v-if="file" #footer>
            <div class="flex gap-2 mt-auto">
                <UButton :to="file" external block label="Download" icon="i-lucide-download" />
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
            </div>
        </template>
    </UCard>
</template>
