<script setup lang="ts">
const route = useRoute();

const value = computed(() => route.path.split("/").pop());
</script>

<template>
    <div class="flex flex-col gap-12 min-h-screen">
        <LayoutHeader />
        <LayoutContainer class="flex-1">
            <Tabs v-model="value" class="w-full max-w-2xl mx-auto">
                <TabsList class="grid w-full grid-cols-2">
                    <TabsTrigger value="login" as-child>
                        <NuxtLink to="/login"> Log in </NuxtLink>
                    </TabsTrigger>
                    <TabsTrigger value="register" as-child>
                        <NuxtLink to="/register"> Sign up </NuxtLink>
                    </TabsTrigger>
                </TabsList>

                <slot />
            </Tabs>
        </LayoutContainer>
        <LayoutContainer>
            <LayoutFooter />
        </LayoutContainer>
    </div>
</template>
