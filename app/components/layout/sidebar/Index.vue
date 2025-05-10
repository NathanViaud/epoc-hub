<script setup lang="ts">
const navigation = [
    { label: "Files", to: "/files", icon: "i-lucide-files" },
    { label: "Profile", to: "/user/profile", icon: "i-lucide-user" },
];

const { user } = useUserSession();
const { collapsed, opened } = useSidebar();
</script>

<template>
    <div
        class="hidden md:flex border rounded-md border-(--ui-border) p-2 m-2 flex-col gap-5 shadow bg-muted"
        :class="{ 'min-w-56': !collapsed }"
    >
        <LayoutSidebarContent :collapsed="collapsed" />
    </div>
    <USlideover
        v-model:open="opened"
        side="left"
        class="flex md:hidden"
        :ui="{
            content: 'flex border-1! rounded-md border-(--ui-border) p-2 m-2 flex-col gap-5 shadow bg-muted w-56',
            overlay: 'md:hidden',
        }"
    >
        <template #content>
            <LayoutSidebarContent />
        </template>
    </USlideover>
</template>
