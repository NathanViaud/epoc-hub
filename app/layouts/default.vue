<script setup lang="ts"></script>

<template>
    <div>
        <SidebarProvider>
            <LayoutSidebar />
            <main class="flex-1 p-4">
                <slot />
            </main>
        </SidebarProvider>
    </div>
</template>
