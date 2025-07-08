<script setup lang="ts">
import JSZip from "jszip";
import { z } from "zod";
import { toast } from "vue-sonner";
import { Upload, Loader } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const emit = defineEmits<{
    (e: "uploaded"): void;
}>();

const open = ref(false);

const schema = z.object({
    file: z.instanceof(File, { message: "File is required" }),
    title: z.string(),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
});

const formSchema = toTypedSchema(schema);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    const { file, title, imageFile } = values;

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
        toast.success("File uploaded successfully");
    } catch (e: any) {
        toast.error(e.message || "Failed to upload file");
    }

    open.value = false;
    form.resetForm();
});

async function handleFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const file = files?.[0];
    if (!file) return;

    await loadEpoc(file);
}

async function loadEpoc(file: File) {
    open.value = true;
    form.setValues({ file });
    if (!form.values.file) return;

    try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(form.values.file);

        const contentJson = await zipContent.file("content.json")?.async("text");
        if (!contentJson) return;

        const parsedJson = JSON.parse(contentJson);
        form.setValues({ title: parsedJson.title || "Untitled" });

        if (parsedJson.image) {
            const path = parsedJson.image.replace(/^.*[\\\/]/, "");

            if (path) {
                const imageFile = zipContent.file(parsedJson.image);
                if (imageFile) {
                    const imageBlob = await imageFile.async("blob");
                    form.setValues({
                        imageUrl: URL.createObjectURL(imageBlob),
                        imageFile: new File([imageBlob], path, { type: imageBlob.type || "image/jpeg" }),
                    });
                } else {
                    form.setValues({
                        imageUrl: undefined,
                        imageFile: undefined,
                    });
                }
            }
        } else {
            form.setValues({
                imageUrl: undefined,
                imageFile: undefined,
            });
        }
    } catch (error) {
        toast.error("Failed to process the file");
    }
}

// Clean up object URLs when component is unmounted
onBeforeUnmount(() => {
    if (form.values.imageUrl && form.values.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(form.values.imageUrl);
    }
});

const input = useTemplateRef("input");
function onFileOpen() {
    input.value?.click();
}

defineExpose({
    loadEpoc,
});
</script>

<template>
    <Dialog v-model:open="open">
        <input ref="input" type="file" @change="handleFileChange" name="file" accept=".epoc" class="hidden" />
        <Button @click="onFileOpen"><Upload /> Upload </Button>

        <DialogScrollContent>
            <DialogHeader>
                <DialogTitle>Upload</DialogTitle>
            </DialogHeader>
            <form @submit="onSubmit" class="space-y-4">
                <Button @click.prevent="onFileOpen" class="w-full"><Upload />Change file</Button>

                <template v-if="form.values.title">
                    <Separator />
                    <h3 class="text-lg">Preview</h3>

                    <EpocItem :title="form.values.title" :image="form.values.imageUrl" preview />
                </template>

                <Button :disabled="form.isSubmitting.value" class="w-full" type="submit">
                    <Upload v-if="!form.isSubmitting.value" /> <Loader v-else class="animate-spin" /> Upload
                </Button>
            </form>
        </DialogScrollContent>
    </Dialog>
</template>
