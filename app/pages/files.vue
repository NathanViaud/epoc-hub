<script setup lang="ts">
import { RefreshCw } from "lucide-vue-next";

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
</script>

<template>
    <div class="space-y-5 w-full">
        <div class="flex justify-between items-center">
            <LayoutPageTitle />
            <div class="flex items-center gap-2">
                <Button size="icon" @click="refreshAll" variant="outline">
                    <RefreshCw class="size-5" :class="{ 'animate-spin': loading }" />
                </Button>
                <FileUploader @uploaded="refreshAll" size="lg" />
            </div>
        </div>
        <div class="flex flex-col gap-2" v-if="maxQuota">
            <UProgress v-model="used" :max="maxQuota" color="neutral" />
            <span class="text-muted self-end">
                {{ used ? getSizeString(used) : "0" }} / {{ getSizeString(maxQuota) }}</span
            >
        </div>
        <div
            v-if="epocs?.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7 gap-4"
        >
            <EpocItem
                v-for="epoc of epocs"
                :id="epoc.id"
                :title="epoc.title"
                :image="epoc.image ? `/images/${epoc.image}` : undefined"
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
