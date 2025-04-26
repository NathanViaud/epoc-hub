<script setup lang="ts">
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
</script>

<template>
    <header class="py-2 px-4 border-b border-[var(--ui-border)]">
        <div class="flex justify-between items-center">
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

                <UAvatar v-if="user" :src="user.avatarUrl" />
                <UButton label="logout" @click="logout" />
            </div>
        </div>
    </header>
</template>
