<script setup lang="ts">
import { ChevronsUpDown, Sun, Moon, LogOut } from "lucide-vue-next";

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
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar class="size-8">
                            <AvatarImage :src="user.avatarUrl" :alt="user.name" />
                            <AvatarFallback>{{ user.name.slice(0, 2) }}</AvatarFallback>
                        </Avatar>
                        <span class="text-sm flex-1">{{ user.name }}</span>
                        <ChevronsUpDown class="size-5" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent class="min-w-56">
                    <DropdownMenuLabel>My account</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem @click="isDark = !isDark">
                        <Sun v-if="isDark" />
                        <Moon v-else />
                        <span>{{ isDark ? "Light mode" : "Dark mode" }}</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem @click="logout" variant="destructive">
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
