<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { registerSchema } from "~/database/schema";
import type { FetchError } from "ofetch";

type Schema = z.output<typeof registerSchema>;

const state = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
    name: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { email, password, name } = event.data;
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: {
                email,
                password,
                name,
            },
        });

        const { fetch } = useUserSession();
        await fetch();

        await navigateTo("/files");
    } catch (error) {
        if ((error as FetchError).status === 409) {
            toast.add({ title: "Email already exists", color: "error" });
            return;
        }
        toast.add({ title: "An error occurred", color: "error" });
        console.error(error);
    }
}
</script>

<template>
    <UCard>
        <template #header>
            <h2 class="text-2xl font-bold">Sign up</h2>
        </template>

        <div class="space-y-4">
            <UForm :schema="registerSchema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Email" name="email">
                    <UInput v-model="state.email" class="w-full" />
                </UFormField>

                <UFormField label="Name" name="name" description="Your name or username">
                    <UInput v-model="state.name" class="w-full" />
                </UFormField>

                <UFormField label="Password" name="password">
                    <UInput v-model="state.password" type="password" class="w-full" />
                </UFormField>

                <UButton block type="submit" size="lg"> Sign up</UButton>
            </UForm>

            <USeparator label="Or" />

            <UButton
                variant="subtle"
                color="neutral"
                label="Login with github"
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
