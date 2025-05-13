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
        const formData = new FormData();

        if (imageFile) {
            formData.append("thumbnail", imageFile);
        }

        formData.append("file", file);
        formData.append("title", title);

        const headers = {
            "Content-Type": "multipart/form-data",
        };

        await $fetch("/api/epocs", {
            method: "POST",
            body: formData,
            headers,
        });
        emit("uploaded");
        toast.add({ title: "Success", description: "File uploaded successfully", color: "success" });
    } catch (e) {
        toast.add({ title: "Error", description: "Failed to upload file", color: "error" });
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
    const files = (event.target as HTMLInputElement).files;
    state.file = files?.[0];
    if (!state.file) return;

    const zip = new JSZip();
    const zipContent = await zip.loadAsync(state.file);

    const contentJson = await zipContent.file("content.json")?.async("text");
    if (!contentJson) return;

    const parsedJson = JSON.parse(contentJson);
    state.title = parsedJson.title;
    const path = parsedJson.image.replace(/^.*[\\\/]/, "");

    if (path) {
        const imageFile = zipContent.file(parsedJson.image);
        if (imageFile) {
            const imageBlob = await imageFile.async("blob");
            state.imageUrl = URL.createObjectURL(imageBlob);
            state.imageFile = new File([imageBlob], path, { type: imageBlob.type || "image/jpeg" });
        }
    }
}

const form = useTemplateRef("form");
</script>

<template>
    <UModal v-model:open="open">
        <UButton size="lg" label="Upload" icon="i-lucide-upload" />
        <template #content>
            <UCard>
                <template #header>
                    <h2>Upload Files</h2>
                </template>
                <UForm ref="form" loading-auto :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormField label="File" name="file">
                        <UInput type="file" @change="handleFileChange" name="file" accept=".epoc" class="w-full" />
                    </UFormField>
                    <div v-if="state.title" class="space-y-3 mt-5">
                        <USeparator />
                        <h2>Preview</h2>

                        <EpocItem :title="state.title" :image="state.imageUrl" />
                    </div>
                    <UButton block type="submit" label="Upload" icon="i-lucide-upload" :loading="form?.loading" />
                </UForm>
            </UCard>
        </template>
    </UModal>
</template>
