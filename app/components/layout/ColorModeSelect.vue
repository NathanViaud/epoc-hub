<script setup lang="ts">
const items = ref([
    {
        label: "System",
        value: "system",
        icon: "i-lucide-monitor",
    },
    {
        label: "Light",
        value: "light",
        icon: "i-lucide-sun",
    },
    {
        label: "Dark",
        value: "dark",
        icon: "i-lucide-moon",
    },
]);

const colorMode = useColorMode();
const icon = computed(() => items.value.find((item) => item.value === colorMode.value)?.icon);
</script>

<template>
    <USelect v-model="colorMode.preference" :items="items" :icon="icon" variant="ghost" />
</template>
