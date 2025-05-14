<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

defineProps<{
    collapsed?: boolean;
}>();

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
            label: "My account",
            avatar: {
                src: computed(() => user.value?.avatarUrl),
                alt: computed(() => user.value?.name),
            },
            type: "label",
        },
    ],
    [
        {
            label: computed(() => (isDark.value ? "Light mode" : "Dark mode")),
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
    <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
        <UButton
            :avatar="{ src: user.avatarUrl, alt: user.name }"
            :label="collapsed ? undefined : user.name"
            variant="ghost"
            size="lg"
            :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
            block
        />
    </UDropdownMenu>
</template>
