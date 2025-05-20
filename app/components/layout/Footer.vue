<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
</script>

<template>
    <footer class="flex flex-col gap-3 sm:flex-row items-center justify-between border-t py-8">
        <span class="text-sm text-muted-foreground flex items-center gap-1"> Copyright © ePoc Hub </span>
        <nav>
            <Button variant="link" as-child class="text-muted-foreground">
                <NuxtLink to="/privacy" class="flex"> Privacy <ArrowUpRight class="size-3" /> </NuxtLink>
            </Button>
            <Button variant="link" class="text-muted-foreground" as-child>
                <NuxtLink to="/terms" class="flex"> Terms of service <ArrowUpRight class="size-3" /> </NuxtLink>
            </Button>
        </nav>
        <LayoutColorModeSelect />
    </footer>
</template>
