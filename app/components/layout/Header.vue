<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
    },
});
</script>

<template>
    <header class="py-2 px-4 border-b border-[var(--ui-border)]">
        <div class="flex justify-between items-center">
            <span class="font-semibold text-lg">ePoc list</span>
            <ClientOnly v-if="!colorMode?.forced">
                <UButton
                    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                    color="neutral"
                    variant="ghost"
                    @click="isDark = !isDark"
                />

                <template #fallback>
                    <div class="size-8" />
                </template>
            </ClientOnly>
        </div>
    </header>
</template>
