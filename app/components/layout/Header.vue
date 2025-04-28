<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { user, clear, loggedIn } = useUserSession();

const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
    },
});

function logout() {
    clear();
    navigateTo("/login");
}

const items: Ref<DropdownMenuItem[][]> = ref([
    [
        {
            label: user.value?.name,
            avatar: {
                src: user.value?.avatarUrl,
                icon: "i-lucide-user",
            },
            type: "label",
        },
    ],
    [
        {
            label: "Profile",
            icon: "i-lucide-user",
            to: "/user/profile",
        },
    ],
    [
        {
            label: "logout",
            icon: "i-lucide-log-out",
            color: "error",
            onClick: logout,
        },
    ],
]);
</script>

<template>
    <header class="border-b border-[var(--ui-border)]">
        <div class="flex justify-between items-center max-w-[var(--ui-container)] mx-auto py-2 px-4">
            <NuxtLink to="/" class="font-semibold text-lg"> ePoc List </NuxtLink>
            <div class="flex gap-2 items-center">
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

                <AuthState>
                    <template #default="{ loggedIn, user }">
                        <UDropdownMenu v-if="loggedIn" :items="items">
                            <UAvatar v-if="user" :src="user.avatarUrl" icon="i-lucide-user" />
                        </UDropdownMenu>
                        <UButton v-else to="/login" label="Login" />
                    </template>
                    <template #placeholder>
                        <div class="size-8 rounded-full animate-pulse bg-[var(--ui-bg-muted)]"></div>
                    </template>
                </AuthState>
            </div>
        </div>
    </header>
</template>
