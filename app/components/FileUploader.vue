<script setup lang="ts">
import JSZip from "jszip";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
    (e: "uploaded"): void;
}>();

const toast = useToast();
const open = ref(false);

const schema = z.object({
    file: z.instanceof(File, { message: "File is required" }),
    title: z.string(),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
    file: undefined,
    title: undefined,
    imageUrl: undefined,
    imageFile: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { file, title, imageFile } = event.data;
    try {
        const upload = useMultipartUpload("/api/files/multipart");
        const { progress, completed, abort } = upload(file);
        const uploadedFile = await completed;

        if (!uploadedFile) {
            throw new Error("File is too large");
        }

        let uploadedImage;
        if (imageFile) {
            const uploadImage = useUpload("/api/files/thumbnail", { method: "PUT" });
            uploadedImage = await uploadImage(imageFile);
        }

        await $fetch("/api/epocs", {
            method: "POST",
            body: {
                title,
                file: uploadedFile.pathname,
                image: uploadedImage?.pathname ?? undefined,
            },
        });

        emit("uploaded");
        toast.add({ title: "Success", description: "File uploaded successfully", color: "success" });
    } catch (e) {
        console.error("Upload error:", e);
        toast.add({
            title: "Error",
            description: e.message || "Failed to upload file",
            color: "error",
        });
    }

    open.value = false;
    Object.assign(state, {
        file: undefined,
        title: undefined,
        imageUrl: undefined,
        imageFile: undefined,
    });
}

async function handleFileChange(event: Event) {
    open.value = true;

    const files = (event.target as HTMLInputElement).files;
    state.file = files?.[0];
    if (!state.file) return;

    try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(state.file);

        const contentJson = await zipContent.file("content.json")?.async("text");
        if (!contentJson) return;

        const parsedJson = JSON.parse(contentJson);
        state.title = parsedJson.title || "Untitled";

        if (parsedJson.image) {
            const path = parsedJson.image.replace(/^.*[\\\/]/, "");

            if (path) {
                const imageFile = zipContent.file(parsedJson.image);
                if (imageFile) {
                    const imageBlob = await imageFile.async("blob");
                    state.imageUrl = URL.createObjectURL(imageBlob);
                    state.imageFile = new File([imageBlob], path, { type: imageBlob.type || "image/jpeg" });
                } else {
                    state.imageUrl = undefined;
                    state.imageFile = undefined;
                }
            }
        } else {
            state.imageUrl = undefined;
            state.imageFile = undefined;
        }
    } catch (error) {
        console.error("Error processing zip file:", error);
        toast.add({
            title: "Error",
            description: "Failed to process the file",
            color: "error",
        });
    }
}

const form = useTemplateRef("form");

// Clean up object URLs when component is unmounted
onBeforeUnmount(() => {
    if (state.imageUrl && state.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(state.imageUrl);
    }
});

const input = useTemplateRef("input");
function onFileOpen() {
    input.value?.click();
}
</script>

<template>
    <div>
        <UButton size="lg" label="Upload" icon="i-lucide-upload" @click="onFileOpen" />
        <input ref="input" type="file" @change="handleFileChange" name="file" accept=".epoc" class="hidden" />
        <UModal v-model:open="open">
            <template #header>
                <h2>Upload Files</h2>
            </template>
            <template #body>
                <UForm ref="form" loading-auto :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UButton block label="Change file" icon="i-lucide-upload" @click="onFileOpen" />
                    <div v-if="state.title" class="space-y-3">
                        <USeparator />
                        <h2>Preview</h2>

                        <EpocItem :title="state.title" :image="state.imageUrl" preview />
                    </div>
                    <UButton block type="submit" label="Upload" icon="i-lucide-upload" :loading="form?.loading" />
                </UForm>
            </template>
        </UModal>
    </div>
</template>
