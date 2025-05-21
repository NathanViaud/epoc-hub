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
                <p class="text-muted-foreground text-lg">
                    Effortlessly host your ePocs and share them with your learners via QR code or link. No more manual
                    hassles with direct download links.
                </p>
                <div class="flex gap-4">
                    <Button size="lg" class="flex-1" as-child>
                        <NuxtLink to="/register"> Sign up </NuxtLink>
                    </Button>
                    <Button size="lg" class="flex-1" variant="outline" as-child>
                        <NuxtLink to="/login"> Log in </NuxtLink>
                    </Button>
                </div>
            </div>

            <Card class="h-fit p-3!">
                <img src="/hero/hero.jpeg" alt="Hero image" class="dark:hidden" />
                <img src="/hero/hero_dark.jpeg" alt="Hero image" class="hidden dark:block" />
            </Card>
        </section>
    </div>
</template>
