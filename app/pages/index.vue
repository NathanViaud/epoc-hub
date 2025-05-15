<script setup lang="ts">
definePageMeta({
    layout: "fullpage",
});
</script>

<template>
    <div class="space-y-12">
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-5">
                <h1 class="text-5xl font-bold">Simplify ePoc hosting with ePoc Host</h1>
                <p class="text-muted text-lg">
                    Effortlessly host your ePocs and share them with your learners via QR code or link. No more manual
                    hassles with direct download links.
                </p>
                <div class="flex gap-4">
                    <UButton block label="Sign up" to="/auth?tab=register" size="xl" />
                    <UButton block label="Log in" to="/auth?tab=login" size="xl" variant="outline" />
                </div>
            </div>

            <UCard :ui="{ body: 'p-3!' }" class="h-fit">
                <img src="/hero/hero.jpeg" alt="Hero image" class="dark:hidden" />
                <img src="/hero/hero_dark.jpeg" alt="Hero image" class="hidden dark:block" />
            </UCard>
        </section>
    </div>
</template>
