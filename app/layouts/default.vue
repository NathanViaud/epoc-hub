<script setup lang="ts">
const { opened } = useSidebar();
const route = useRoute();

watch(route, () => {
    if (opened.value) opened.value = false;
});
</script>

<template>
    <div class="flex fixed inset-0">
        <LayoutSidebar />
        <slot />
    </div>
</template>
