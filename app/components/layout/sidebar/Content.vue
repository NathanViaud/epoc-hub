<script setup lang="ts">
defineProps<{
    collapsed?: boolean;
}>();
const navigation = [
    {
        label: "Home",
        content: [{ label: "Files", to: "/files", icon: "i-lucide-folder" }],
    },
    {
        label: "Settings",
        content: [
            { label: "Profile", to: "/settings/profile", icon: "i-lucide-user" },
            { label: "Billing", to: "/settings/billing", icon: "i-lucide-credit-card" },
        ],
    },
];
</script>

<template>
    <nav class="flex-1 space-y-5">
        <div class="font-semibold flex items-center gap-2 p-1">
            <div class="size-6 flex items-center justify-center border border-(--ui-border) rounded-sm">
                <UIcon name="i-lucide-cloud" />
            </div>
            <span :class="{ hidden: collapsed }">Files cloud</span>
        </div>

        <div v-for="part of navigation" class="flex flex-col gap-1">
            <span v-show="!collapsed" class="text-muted text-sm font-semibold px-3">{{ part.label }}</span>
            <ul class="space-y-1">
                <li v-for="item of part.content">
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
        </div>
    </nav>
    <LayoutUserMenu :collapsed="collapsed" />
</template>
