<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
});

const { data: epocs, refresh } = await useFetch("/api/epocs");
</script>

<template>
    <div class="space-y-5">
        <div class="flex justify-between items-center">
            <h1>Files</h1>
            <FileUploader @uploaded="refresh" />
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
