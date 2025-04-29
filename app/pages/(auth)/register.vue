<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { email, password } = event.data;
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: {
                email,
                password,
            },
        });

        await navigateTo("/files");
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div>
        <UCard class="mx-auto max-w-xl">
            <template #header>
                <h2 class="text-2xl font-bold">Register</h2>
            </template>

            <div class="space-y-4">
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormField label="Email" name="email">
                        <UInput v-model="state.email" class="w-full" />
                    </UFormField>
                    <UFormField label="Password" name="password">
                        <UInput v-model="state.password" type="password" class="w-full" />
                    </UFormField>

                    <UButton block type="submit"> Submit </UButton>
                </UForm>

                <USeparator label="Or" />

                <UButton
                    variant="subtle"
                    color="neutral"
                    label="Login with github"
                    to="/api/auth/github"
                    icon="i-simple-icons-github"
                    external
                    block
                />
            </div>
        </UCard>
    </div>
</template>
