<script setup lang="ts">
definePageMeta({
    layout: "fullpage",
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection("content").path(route.path).first();
});
</script>

<template>
    <ContentRenderer v-if="page" :value="page" class="prose prose-slate dark:prose-invert" />
</template>
