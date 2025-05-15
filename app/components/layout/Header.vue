<template>
    <header class="border-b border-(--ui-border) sticky top-0 backdrop-blur-lg bg-(--ui-bg)/60">
        <UContainer>
            <div class="flex items-center justify-between py-2">
                <NuxtLink to="/" class="font-semibold"> ePoc Host </NuxtLink>
                <AuthState #default="{ loggedIn }">
                    <div v-if="!loggedIn" class="flex gap-2">
                        <UButton label="Log in" variant="subtle" to="/auth?tab=login" />
                        <UButton label="Sign up" to="/auth?tab=register" />
                    </div>
                    <UButton v-else label="Go to app" to="/files" />
                </AuthState>
            </div>
        </UContainer>
    </header>
</template>
