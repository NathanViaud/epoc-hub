<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
});

const { user } = useUserSession();
</script>

<template>
    <div class="flex flex-col gap-2 items-center">
        <UAvatar :src="user.avatarUrl" icon="i-lucide-user" size="2xl" />
        <span class="font-semibold">{{ user.name }}</span>
    </div>
</template>
