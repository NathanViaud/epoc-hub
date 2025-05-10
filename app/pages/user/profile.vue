<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Profile",
});

const { user } = useUserSession();
</script>

<template>
    <div class="space-y-5 w-full">
        <div>
            <LayoutPageTitle />
        </div>
        <UCard :ui="{ body: 'flex flex-col gap-2 items-center' }" class="w-full max-w-4xl mx-auto">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-user" class="text-muted size-5" />
                    <h2 class="text-xl">Account</h2>
                </div>
            </template>
            <UAvatar :src="user.avatarUrl" icon="i-lucide-user" size="2xl" />
            <span class="text-xl font-semibold">{{ user.name }}</span>
            <ul>
                <li><strong>Current plan</strong>: Free</li>
            </ul>
        </UCard>
        <UCard class="w-full max-w-4xl mx-auto">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-receipt-euro" class="text-muted size-5" />
                    <h2 class="text-xl">Billing</h2>
                </div>
            </template>

            <HeroPricing />
        </UCard>
    </div>
</template>
