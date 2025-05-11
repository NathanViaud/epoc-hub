<script setup lang="ts">
definePageMeta({
    layout: "fullpage",
});
</script>

<template>
    <div class="space-y-12 mt-12">
        <section class="grid grid-cols-2">
            <div class="space-y-4">
                <h1 class="text-5xl font-bold">Simplify ePoc hosting with ePoc Host</h1>
                <p class="text-muted text-lg">
                    Effortlessly host your ePocs and share them with your learners via QR code or link. No more manual
                    hassles with direct download links.
                </p>
                <div class="flex gap-2">
                    <UButton block label="Sign up" to="/register" size="xl" />
                    <UButton block label="Login" to="/login" size="xl" variant="outline" />
                </div>
            </div>
        </section>
        <section class="space-y-4">
            <h2 class="text-4xl font-bold text-center">Pricing</h2>
            <HeroPricing />
        </section>
    </div>
</template>
