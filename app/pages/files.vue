<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
});

const { data: epocs, refresh } = await useFetch("/api/epocs");
const { data: quota, refresh: refreshQuota } = await useFetch("/api/files/quota");
const { data: maxQuota } = await useFetch("/api/user/quota");

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
        <div class="flex flex-col gap-2" v-if="maxQuota">
            <UProgress v-model="quota" :max="maxQuota" color="neutral" />
            <span class="text-muted self-end">
                {{ quota ? getSizeString(quota) : "0" }} / {{ getSizeString(maxQuota) }}</span
            >
        </div>
        <div v-if="epocs?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <EpocItem
                v-for="epoc of epocs"
                :id="epoc.id"
                :title="epoc.title"
                :image="`/images/${epoc.image}`"
                :path="`${epoc.file}`"
                @deleted="refreshAll"
            />
        </div>
        <div v-else>
            <div class="flex flex-col gap-2 items-center justify-center text-muted">
                <UIcon name="i-lucide-folder-x" class="size-10" />
                <span class="text-lg">No files found</span>
            </div>
        </div>
    </div>
</template>
