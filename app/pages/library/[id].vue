<script setup lang="ts">
definePageMeta({
    layout: "fullpage",
});

const route = useRoute();
const { data: epocs } = await useFetch(`/api/library/${route.params.id}`);
</script>

<template>
    <div v-if="epocs?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <EpocItem
            v-for="epoc of epocs"
            :id="epoc.id"
            :title="epoc.title"
            :image="`/images/${epoc.image}`"
            :path="`${epoc.file}`"
            :downloads="epoc.downloads"
            library-mode
        />
    </div>
</template>
