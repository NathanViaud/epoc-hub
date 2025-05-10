<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <div class="flex gap-2 items-center">
        <LayoutSidebarToggle />
        <USeparator orientation="vertical" class="h-6" />
        <h1>{{ route.meta.title }}</h1>
    </div>
</template>
