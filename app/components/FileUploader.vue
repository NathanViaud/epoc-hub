<script setup lang="ts">
import JSZip from "jszip";

const emit = defineEmits<{
    (e: "uploaded"): void;
}>();

const uploadFile = useUpload("/api/files", { method: "PUT" });

const toast = useToast();
const open = ref(false);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const loading = ref(false);
const metadata = reactive({
    title: "",
    image: "",
    imageUrl: "",
    imageFile: null as File | null,
});

async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.[0]) return;

    fileInput.value = target;

    const zip = new JSZip();
    const zipContent = await zip.loadAsync(target.files[0]);

    const contentJson = await zipContent.file("content.json")?.async("text");
    if (!contentJson) return;

    const parsedJson = JSON.parse(contentJson);
    metadata.title = parsedJson.title;
    metadata.image = parsedJson.image.replace(/^assets\//, "");

    if (metadata.image) {
        const originalImagePath = `assets/${metadata.image}`;
        const imageFile = zipContent.file(originalImagePath);
        if (imageFile) {
            const imageBlob = await imageFile.async("blob");
            metadata.imageUrl = URL.createObjectURL(imageBlob);
            metadata.imageFile = new File([imageBlob], metadata.image, { type: imageBlob.type || "image/jpeg" });
        }
    }
}

async function handleUpload() {
    loading.value = true;
    try {
        if (!fileInput.value || !metadata.imageFile) return;

        const formData = new FormData();
        formData.append("files", metadata.imageFile);

        const uploadedImage = await $fetch("/api/images", {
            method: "PUT",
            body: formData,
        });

        const uploadedFile = await uploadFile(fileInput.value);
        if (!uploadedFile[0] || !uploadedImage[0]) return;

        await $fetch("/api/epocs", {
            method: "POST",
            body: {
                title: metadata.title,
                image: uploadedImage[0].pathname,
                file: uploadedFile[0].pathname,
            },
        });

        emit("uploaded");
        open.value = false;
        toast.add({ title: "Success", description: "File uploaded successfully", color: "success" });

        metadata.title = "";
        metadata.image = "";
        metadata.imageUrl = "";
        metadata.imageFile = null;
    } catch (error) {
        toast.add({ title: "Error", description: "Failed to upload file", color: "error" });
    }

    loading.value = false;
}
</script>

<template>
    <UModal v-model:open="open">
        <UButton size="lg" label="Upload" icon="i-lucide-upload" />
        <template #content>
            <UCard>
                <template #header>
                    <h2>Upload Files</h2>
                </template>
                <UInput type="file" @change="handleFileChange" name="file" accept=".epoc" class="w-full" />

                <div v-if="metadata.title" class="space-y-3 mt-5">
                    <USeparator />
                    <h2>Preview</h2>

                    <EpocItem :title="metadata.title" :image="metadata.imageUrl" />
                </div>

                <template #footer>
                    <UButton :loading="loading" block @click="handleUpload" label="Upload" icon="i-lucide-upload" />
                </template>
            </UCard>
        </template>
    </UModal>
</template>
