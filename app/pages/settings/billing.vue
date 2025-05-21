<script setup lang="ts">
import { CreditCard, CloudUpload } from "lucide-vue-next";
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
                icon: CloudUpload,
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
        <Card class="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle class="flex items-center gap-2 text-xl">
                    <CreditCard class="text-muted-foreground" /> Plans
                </CardTitle>
                <CardDescription>Choose your plan here</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="space-y-4">
                    <Card v-for="plan of plans">
                        <CardContent class="flex justify-between">
                            <div class="space-y-1">
                                <div class="flex gap-2 items-center">
                                    <CardTitle class="text-lg">{{ plan.name }}</CardTitle>
                                    <Badge v-if="plan.id === currentPlan">Current plan</Badge>
                                </div>
                                <CardDescription>{{ plan.price }}</CardDescription>
                            </div>
                            <ul class="grid grid-cols-1 gap-5">
                                <li
                                    v-for="feature of plan.features"
                                    class="text-muted-foreground flex items-center gap-1 text-sm"
                                >
                                    <Component :is="feature.icon" />
                                    <span>{{ feature.label }}</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
