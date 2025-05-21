<template>
    <header class="border-b sticky top-0 backdrop-blur-lg bg-background/60">
        <LayoutContainer>
            <div class="flex items-center justify-between py-2">
                <NuxtLink to="/" class="font-medium"> ePoc Hub </NuxtLink>
                <AuthState #default="{ loggedIn }">
                    <div v-if="!loggedIn" class="flex gap-2">
                        <Button variant="outline" as-child>
                            <NuxtLink to="/login"> Log in </NuxtLink>
                        </Button>
                        <Button as-child>
                            <NuxtLink to="/register"> Sign up </NuxtLink>
                        </Button>
                    </div>
                    <Button v-else as-child>
                        <NuxtLink to="/files">Go to app</NuxtLink>
                    </Button>
                </AuthState>
            </div>
        </LayoutContainer>
    </header>
</template>
