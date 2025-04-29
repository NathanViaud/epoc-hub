<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
});

const { user } = useUserSession();
</script>

<template>
    <div>
        <UCard :ui="{ body: 'flex flex-col items-center gap-2' }" class="max-w-sm mx-auto">
            <UAvatar :src="user.avatarUrl" icon="i-lucide-user" size="2xl" />
            <span class="text-xl font-semibold">{{ user.name }}</span>
            <ul>
                <li><strong>Current plan</strong>: Free</li>
            </ul>
        </UCard>
    </div>
</template>
