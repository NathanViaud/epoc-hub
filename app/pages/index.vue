<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
});

const { data: epocs, refresh } = await useFetch("/api/epocs");
const { data: quota, refresh: refreshQuota } = await useFetch("/api/files/quota");

function refreshAll() {
    refresh();
    refreshQuota();
}
</script>

<template>
    <div class="space-y-5">
        <div class="flex justify-between items-center">
            <h1>Files</h1>
            <FileUploader @uploaded="refreshAll" />
        </div>
        <div class="flex flex-col gap-2">
            <UProgress v-model="quota" :max="200000000" color="neutral" />
            <span v-if="quota" class="text-[var(--ui-text-muted)] self-end">
                {{ getSizeString(quota) }} / {{ getSizeString(1024 * 1024 * 200) }}</span
            >
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <EpocItem
                v-for="epoc of epocs"
                :title="epoc.title"
                :image="`/images/${epoc.image}`"
                :file="`/files/${epoc.file}`"
            />
        </div>
    </div>
</template>
