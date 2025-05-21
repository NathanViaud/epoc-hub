<script setup lang="ts">
import { Monitor, Sun, Moon } from "lucide-vue-next";

const colorMode = useColorMode();
const selected = computed(() => items.value.find((item) => item.value === colorMode.value));

const items = ref([
    {
        label: "System",
        value: "system",
        icon: Monitor,
    },
    {
        label: "Light",
        value: "light",
        icon: Sun,
    },
    {
        label: "Dark",
        value: "dark",
        icon: Moon,
    },
]);
</script>

<template>
    <ClientOnly>
        <Select v-model="colorMode.preference">
            <SelectTrigger class="bg-background! transition hover:bg-input! border-none shadow-none">
                <SelectValue>
                    <Component :is="selected?.icon" />
                    {{ selected?.label }}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="item of items" :value="item.value">
                        <Component :is="item.icon" /> {{ item.label }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </ClientOnly>
</template>
