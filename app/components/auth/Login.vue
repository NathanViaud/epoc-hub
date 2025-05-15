<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { loginSchema } from "~/database/schema";

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
    <UCard>
        <template #header>
            <h2 class="text-2xl font-bold">Log in</h2>
        </template>

        <div class="space-y-4">
            <UForm :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Email" name="email">
                    <UInput v-model="state.email" class="w-full" />
                </UFormField>
                <UFormField label="Password" name="password">
                    <UInput v-model="state.password" type="password" class="w-full" />
                </UFormField>

                <UButton block type="submit" size="lg"> Log in</UButton>
            </UForm>

            <USeparator label="Or" />

            <UButton
                variant="subtle"
                color="neutral"
                label="Log in with GitHub"
                to="/api/auth/github"
                icon="i-simple-icons-github"
                size="lg"
                external
                block
            />

            <UButton
                variant="subtle"
                color="neutral"
                label="Log in with Google"
                to="/api/auth/google"
                icon="i-simple-icons-google"
                size="lg"
                external
                block
            />
        </div>
    </UCard>
</template>
