<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

definePageMeta({
    layout: "fullpage",
});

const route = useRoute();
const router = useRouter();

const items: TabsItem[] = [
    {
        label: "Log in",
        value: "login",
        slot: "login",
    },
    {
        label: "Sign up",
        value: "register",
        slot: "register",
    },
];

const active = computed({
    get() {
        return (route.query.tab as string) || "login";
    },
    set(tab) {
        router.push({
            path: "/auth",
            query: { tab },
        });
    },
});
</script>

<template>
    <UTabs v-model="active" :items="items" class="w-full max-w-2xl mx-auto" color="neutral" :ui="{ root: 'gap-8' }">
        <template #login>
            <AuthLogin />
        </template>
        <template #register>
            <AuthRegister />
        </template>
    </UTabs>
</template>
