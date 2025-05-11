<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Files",
});

const loading = ref(false);
const { data: epocs, refresh } = await useFetch("/api/epocs");
const { data: quota, refresh: refreshQuota } = await useFetch("/api/files/quota");
const { data: maxQuota, refresh: refreshMaxQuota } = await useFetch("/api/user/quota");

async function refreshAll() {
    loading.value = true;
    await Promise.all([refresh(), refreshQuota(), refreshMaxQuota()]);
    loading.value = false;
}
</script>

<template>
    <div class="space-y-5 w-full">
        <div class="flex justify-between items-center">
            <LayoutPageTitle />
            <div class="flex items-center gap-2">
                <UButton
                    square
                    icon="i-lucide-refresh-ccw"
                    @click="refreshAll()"
                    :loading="loading"
                    variant="outline"
                />
                <FileUploader @uploaded="refreshAll" />
            </div>
        </div>
        <div class="flex flex-col gap-2" v-if="maxQuota">
            <UProgress v-model="quota" :max="maxQuota" color="neutral" />
            <span class="text-muted self-end">
                {{ quota ? getSizeString(quota) : "0" }} / {{ getSizeString(maxQuota) }}</span
            >
        </div>
        <div v-if="epocs?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <EpocItem
                v-for="epoc of epocs"
                :id="epoc.id"
                :title="epoc.title"
                :image="`/images/${epoc.image}`"
                :path="`${epoc.file}`"
                :downloads="epoc.downloads"
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
