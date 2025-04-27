<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { user, clear } = useUserSession();

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
            label: user.value.name,
            avatar: {
                src: user.value.avatarUrl,
                icon: "i-lucide-user",
            },
            type: "label",
        },
    ],
    [
        {
            label: "logout",
            icon: "i-lucide-log-out",
            onClick: logout,
        },
    ],
]);
</script>

<template>
    <header class="border-b border-[var(--ui-border)]">
        <div class="flex justify-between items-center max-w-[var(--ui-container)] mx-auto py-2 px-4">
            <span class="font-semibold text-lg">ePoc list</span>
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

                <UDropdownMenu :items="items">
                    <UAvatar v-if="user" :src="user.avatarUrl" icon="i-lucide-user" />
                </UDropdownMenu>
            </div>
        </div>
    </header>
</template>
