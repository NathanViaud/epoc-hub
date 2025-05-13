<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

interface Pricing {
    name: string;
    description: string;
    price: string;
    features: {
        label: string;
        icon: string;
    }[];
    button: {
        label: string;
        color: ButtonProps["color"];
        disabled?: boolean;
    };
}

const pricings: Pricing[] = [
    {
        name: "Free",
        description: "Free plan",
        price: "0 €",
        features: [
            {
                label: "150 MB of storage",
                icon: "i-lucide-cloud-upload",
            },
        ],
        button: {
            label: "Get started",
            color: "success",
        },
    },
    {
        name: "Advanced storage",
        description: "Advanced storage plan",
        price: "Soon",
        features: [
            {
                label: "10 GB of storage",
                icon: "i-lucide-cloud-upload",
            },
        ],
        button: {
            label: "Soon",
            color: "neutral",
            disabled: true,
        },
    },
];
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
        <UCard v-for="pricing of pricings" :ui="{ body: 'flex flex-col gap-4 h-full' }">
            <div class="space-y-2">
                <span class="text-2xl font-semibold">{{ pricing.name }}</span>
                <p class="text-dimmed">{{ pricing.description }}</p>
            </div>

            <span class="text-4xl font-semibold">{{ pricing.price }}</span>

            <ul class="flex-1">
                <li v-for="feature of pricing.features" class="text-muted flex items-center gap-1">
                    <UIcon :name="feature.icon" />
                    {{ feature.label }}
                </li>
            </ul>
            <UButton
                size="xl"
                :color="pricing.button.color"
                variant="soft"
                block
                :label="pricing.button.label"
                :disabled="pricing.button.disabled"
                to="/register"
            />
        </UCard>
    </div>
</template>
