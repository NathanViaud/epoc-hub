<script setup lang="ts">
const { opened, collapsed } = useSidebar();
</script>

<template>
    <UButton class="md:hidden" square icon="i-lucide-panel-left" @click="opened = !opened" variant="ghost" />
    <UButton class="hidden md:flex" square icon="i-lucide-panel-left" @click="collapsed = !collapsed" variant="ghost" />
</template>
