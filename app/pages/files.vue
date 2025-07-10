<script setup lang="ts">
import { RefreshCw, FolderX, Upload } from "lucide-vue-next";

definePageMeta({
    middleware: ["authenticated"],
    title: "Files",
});

const loading = ref(false);
const { data: epocs, refresh } = await useFetch("/api/epocs");
const { data: used, refresh: refreshUsed } = await useFetch("/api/files/used");
const { data: maxQuota, refresh: refreshMaxQuota } = await useFetch("/api/user/quota");

async function refreshAll() {
    loading.value = true;
    await Promise.all([refresh(), refreshUsed(), refreshMaxQuota()]);
    loading.value = false;
}

const dropZone = useTemplateRef("drop-zone");
const fileUploader = useTemplateRef("file-uploader");

function onDrop(files: File[] | null) {
    if (!fileUploader.value || !files?.[0]) return;
    fileUploader.value.loadEpoc(files[0]);
}

const { isOverDropZone } = useDropZone(dropZone, {
    onDrop,
    multiple: false,
});
</script>

<template>
    <div class="flex flex-col gap-5 w-full h-full">
        <div class="flex justify-between items-center">
            <LayoutPageTitle />
            <div class="flex items-center gap-2">
                <Button size="icon" @click="refreshAll" variant="outline">
                    <RefreshCw class="size-5" :class="{ 'animate-spin': loading }" />
                </Button>
                <FileUploader ref="file-uploader" @uploaded="refreshAll" size="lg" />
            </div>
        </div>

        <div class="flex flex-col gap-2" v-if="maxQuota">
            <Progress v-if="used !== undefined" :model-value="(used / maxQuota) * 100" />
            <span class="text-muted-foreground self-end">
                {{ used ? getSizeString(used) : "0" }} / {{ getSizeString(maxQuota) }}</span
            >
        </div>

        <div ref="drop-zone" class="flex flex-col flex-1">
            <div
                v-if="isOverDropZone"
                class="flex-1 border border-dashed rounded-md flex items-center justify-center text-muted-foreground flex-col gap-2"
            >
                <div class="border border-dashed rounded-full p-4">
                    <Upload />
                </div>
                <p>Déposer les fichiers ici</p>
            </div>
            <template v-else>
                <div
                    v-if="epocs?.length"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-4"
                    :class="{ 'pointer-events-none': isOverDropZone }"
                >
                    <EpocItem
                        v-for="epoc of epocs"
                        :id="epoc.id"
                        :title="epoc.title"
                        :image="epoc.image ? `/images/${epoc.image}` : undefined"
                        :path="`${epoc.file}`"
                        :downloads="epoc.downloads"
                        @deleted="refreshAll"
                        @dragenter.stop.prevent
                        @dragleave.stop.prevent
                        @dragover.stop.prevent
                    />
                </div>
                <div v-else>
                    <div class="flex flex-col gap-2 items-center justify-center text-muted-foreground">
                        <FolderX class="size-10" />
                        <span class="text-lg">No files found</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
