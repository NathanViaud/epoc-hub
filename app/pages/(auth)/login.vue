<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { loginSchema } from "~/database/schema";

definePageMeta({
    layout: "fullpage",
});

type Schema = z.output<typeof loginSchema>;

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { email, password } = event.data;
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: {
                email,
                password,
            },
        });
        const { fetch } = useUserSession();
        await fetch();

        await navigateTo("/files");
    } catch (error) {
        toast.add({ title: "Invalid credentials", color: "error" });
    }
}
</script>

<template>
    <div>
        <UCard class="mx-auto max-w-xl">
            <template #header>
                <h2 class="text-2xl font-bold">Login</h2>
            </template>

            <div class="space-y-4">
                <UForm :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
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
