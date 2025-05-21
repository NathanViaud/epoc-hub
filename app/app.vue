<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
    <NuxtLoadingIndicator />

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
        <!-- @vue-expect-error -->
        <Toaster rich-colors :theme="colorMode.value" />
    </ClientOnly>
</template>
