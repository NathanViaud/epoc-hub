<script setup lang="ts">
import { GitHubIcon, GoogleIcon } from "vue3-simple-icons";
import { toast } from "vue-sonner";

const state = reactive({
    email: undefined,
    password: undefined,
});

async function login() {
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: {
                email: state.email,
                password: state.password,
            },
        });
        const { fetch } = useUserSession();
        await fetch();

        await navigateTo("/files");
    } catch (error) {
        toast.error("Invalid credentials");
    }
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="text-2xl">Log in</CardTitle>
        </CardHeader>

        <CardContent>
            <form @submit.prevent="login" class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input v-model="state.email" id="email" type="email" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input v-model="state.password" id="password" type="password" />
                </div>

                <Button type="submit">Log in</Button>
            </form>

            <Separator label="Or" class="my-6" />

            <div class="flex flex-col gap-4">
                <Button variant="secondary" class="flex-1" as-child>
                    <NuxtLink to="/api/auth/github" external class="inline-flex items-center gap-2">
                        <GitHubIcon /> Log in with GitHub
                    </NuxtLink>
                </Button>
                <Button variant="secondary" class="flex-1" as-child>
                    <NuxtLink to="/api/auth/google" external class="inline-flex items-center gap-2">
                        <GoogleIcon /> Log in with Google
                    </NuxtLink>
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
