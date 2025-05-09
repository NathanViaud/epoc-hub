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
            label: "Switch Theme",
            icon: computed(() => (isDark.value ? "i-lucide-sun" : "i-lucide-moon")),
            onClick: () => {
                isDark.value = !isDark.value;
            },
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
    <header class="border-b border-(--ui-border)">
        <div class="flex justify-between items-center max-w-(--ui-container) mx-auto py-2 px-4">
            <NuxtLink to="/" class="font-semibold text-lg"> ePoc List </NuxtLink>

            <nav>
                <UButton
                    v-if="loggedIn"
                    to="/files"
                    label="Files"
                    variant="link"
                    color="neutral"
                    active-color="primary"
                />
            </nav>

            <div class="flex gap-2 items-center">
                <AuthState>
                    <template #default="{ loggedIn, user }">
                        <UDropdownMenu v-if="loggedIn" :items="items">
                            <UAvatar v-if="user" :src="user.avatarUrl" icon="i-lucide-user" class="cursor-pointer" />
                        </UDropdownMenu>
                        <div class="flex gap-2" v-else>
                            <UButton to="/login" label="Login" variant="outline" />
                            <UButton to="/register" label="Register" />
                        </div>
                    </template>
                    <template #placeholder>
                        <div class="size-8 rounded-full animate-pulse bg-muted"></div>
                    </template>
                </AuthState>
            </div>
        </div>
    </header>
</template>
