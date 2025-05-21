<script setup lang="ts">
import { Folder, Library, User, CreditCard, Database, Cloud } from "lucide-vue-next";

const home = [
    {
        title: "Files",
        url: "/files",
        icon: Folder,
    },
    {
        title: "Library",
        url: "/library",
        icon: Library,
    },
];

const settings = [
    {
        title: "Profile",
        url: "/settings/profile",
        icon: User,
    },
    {
        title: "Billing",
        url: "/settings/billing",
        icon: CreditCard,
    },
    {
        title: "Storage",
        url: "/settings/storage",
        icon: Database,
    },
];

const route = useRoute();
</script>

<template>
    <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton class="pointer-events-none">
                        <div class="size-6 border rounded flex items-center justify-center">
                            <Cloud class="size-4" />
                        </div>
                        <span class="font-medium text-base">ePoc Hub</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Home</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in home" :key="item.title">
                            <SidebarMenuButton as-child :is-active="item.url === route.path">
                                <NuxtLink :to="item.url">
                                    <Component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in settings" :key="item.title">
                            <SidebarMenuButton as-child :is-active="item.url === route.path">
                                <NuxtLink :to="item.url">
                                    <Component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <LayoutUserMenu />
        </SidebarFooter>
    </Sidebar>
</template>
