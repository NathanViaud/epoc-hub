<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <div class="flex gap-1 items-center">
        <LayoutSidebarToggle />
        <USeparator orientation="vertical" class="h-5" />
        <h1 class="ml-1 text-2xl font-bold">{{ route.meta.title }}</h1>
    </div>
</template>
