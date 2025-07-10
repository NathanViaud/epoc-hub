<script setup lang="ts">
import type { FetchError } from "ofetch";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { registerSchema } from "#shared/database/schema";
import { useForm } from "vee-validate";
import { GoogleIcon, GitHubIcon } from "vue3-simple-icons";

const formSchema = toTypedSchema(registerSchema);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    const { email, name, password } = values;
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
            toast.error("Email already exists");
            return;
        }
        toast.error("An error occurred");
        console.error(error);
    }
});
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="text-2xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
            <form @submit="onSubmit" class="grid gap-6">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormDescription> Your display name </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <Button type="submit">Sign up</Button>
            </form>

            <Separator label="Or" class="my-6" />

            <div class="flex flex-col gap-4">
                <Button variant="secondary" class="flex-1" as-child>
                    <NuxtLink to="/api/auth/github" external class="inline-flex items-center gap-2">
                        <GitHubIcon /> Log in with GitHub
                    </NuxtLink>
                </Button>
                <Button
                    :disabled="!form.meta.value.valid || form.isSubmitting"
                    variant="secondary"
                    class="flex-1"
                    as-child
                >
                    <NuxtLink to="/api/auth/google" external class="inline-flex items-center gap-2">
                        <GoogleIcon /> Log in with Google
                    </NuxtLink>
                </Button>
            </div>
        </CardContent>
    </Card>
</template>
