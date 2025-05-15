<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Billing",
});

const currentPlan = "free";
const plans = [
    {
        id: "free",
        name: "Free",
        price: "Free for all users",
        features: [
            {
                label: "150MB of storage",
                icon: "i-lucide-cloud-upload",
            },
        ],
    },
];
</script>

<template>
    <div class="space-y-5 w-full">
        <div>
            <LayoutPageTitle />
        </div>
        <UCard class="w-full max-w-4xl mx-auto">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-credit-card" class="text-muted size-5" />
                    <h2 class="text-xl">Plans</h2>
                </div>
            </template>
            <div class="space-y-4">
                <UCard v-for="plan of plans">
                    <div class="flex justify-between">
                        <div space-y-1>
                            <div class="flex gap-2 items-center">
                                <h3 class="text-lg font-semibold">{{ plan.name }}</h3>
                                <UBadge v-if="plan.id === currentPlan" label="Current plan" variant="soft" />
                            </div>
                            <p class="text-muted text-sm">{{ plan.price }}</p>
                            <UTooltip text="Soon" :delay-duration="0">
                                <UButton v-if="plan.id !== currentPlan" label="Upgrade plan" class="mt-4" disabled />
                            </UTooltip>
                        </div>
                        <ul class="grid grid-cols-1 gap-5">
                            <li v-for="feature of plan.features" class="text-muted flex items-center gap-1 text-sm">
                                <UIcon :name="feature.icon" />
                                <span>{{ feature.label }}</span>
                            </li>
                        </ul>
                    </div>
                </UCard>
            </div>
        </UCard>
    </div>
</template>
