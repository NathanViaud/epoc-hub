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

const deleteModal = ref(false);
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

                <USeparator />

                <li class="flex items-center">
                    <span class="flex-1 font-semibold text-error">Danger zone</span>
                    <UModal title="Delete your account" v-model:open="deleteModal">
                        <UButton color="error" label="Delete your account" icon="i-lucide-trash" variant="soft" />
                        <template #body>
                            <div class="rounded-full bg-muted size-16 flex items-center justify-center mx-auto mb-4">
                                <UIcon name="i-lucide-triangle-alert size-10 text-error" />
                            </div>
                            <p class="text-center">This will delete all your data from this website</p>
                        </template>
                        <template #footer>
                            <UButton block variant="soft" label="No, keep it" @click="deleteModal = false" />
                            <UButton block color="error" label="Yes, delete it" />
                        </template>
                    </UModal>
                </li>
            </ul>
        </UCard>
    </div>
</template>
