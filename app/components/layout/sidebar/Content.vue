<script setup lang="ts">
defineProps<{
    collapsed?: boolean;
}>();
const navigation = [
    { label: "Files", to: "/files", icon: "i-lucide-files" },
    { label: "Profile", to: "/user/profile", icon: "i-lucide-user" },
];
</script>

<template>
    <nav class="flex-1 space-y-4">
        <div class="font-semibold flex items-center gap-2 p-1">
            <div class="size-6 flex items-center justify-center border border-(--ui-border) rounded-sm">
                <UIcon name="i-lucide-cloud" />
            </div>
            <span :class="{ hidden: collapsed }">Files cloud</span>
        </div>

        <ul class="space-y-1">
            <li v-for="item of navigation">
                <UButton
                    :label="collapsed ? undefined : item.label"
                    :square="collapsed"
                    :to="item.to"
                    :icon="item.icon"
                    variant="ghost"
                    active-variant="soft"
                    class="w-full"
                    size="lg"
                />
            </li>
        </ul>
    </nav>
    <LayoutUserMenu :collapsed="collapsed" />
</template>
