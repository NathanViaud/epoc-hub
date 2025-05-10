<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Profile",
});

const { user } = useUserSession();
</script>

<template>
    <div class="space-y-5">
        <div>
            <LayoutPageTitle />
        </div>
        <div class="flex flex-col gap-2 items-center">
            <UAvatar :src="user.avatarUrl" icon="i-lucide-user" size="2xl" />
            <span class="text-xl font-semibold">{{ user.name }}</span>
            <ul>
                <li><strong>Current plan</strong>: Free</li>
            </ul>
        </div>
    </div>
</template>
