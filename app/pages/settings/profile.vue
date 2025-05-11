<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Profile",
});

const { user, fetch } = useUserSession();

const toast = useToast();
const username = ref(user.value.name);
watchDebounced(
    username,
    async (newValue) => {
        try {
            await $fetch("/api/auth/update", {
                method: "PATCH",
                body: {
                    name: newValue,
                },
            });
            await fetch();
            toast.add({ title: "Username updated", color: "success" });
        } catch (e) {
            toast.add({ title: "An error occured during username update", color: "error" });
        }
    },
    { debounce: 1000 },
);
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

            <ul class="w-full space-y-4">
                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Profile picture</span>
                    <UAvatar :src="user.avatarUrl" icon="i-lucide-user" size="lg" />
                </li>

                <USeparator />

                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Username</span>
                    <UInput v-model="username" />
                </li>
            </ul>
        </UCard>
    </div>
</template>
