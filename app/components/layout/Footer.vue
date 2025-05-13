<template>
    <footer class="flex items-center justify-between border-t border-(--ui-border) py-8">
        <span class="text-sm text-muted flex items-center gap-1">
            <span>Made with </span>
            <div class="relative">
                <UIcon name="i-lucide-heart" class="[&>path]:fill-red-500 [&>path]:stroke-red-500" mode="svg" />
                <UIcon
                    name="i-lucide-heart"
                    class="[&>path]:fill-red-500 [&>path]:stroke-red-500 absolute animate-ping top-0"
                    mode="svg"
                />
            </div>
            <NuxtLink href="https://github.com/NathanViaud">Nathan Viaud</NuxtLink>
        </span>
        <nav>
            <UButton
                variant="link"
                label="Privacy"
                to="/privacy"
                trailing-icon="i-lucide-arrow-up-right"
                :ui="{ trailingIcon: 'size-3 align-top inline-block' }"
            />
            <UButton
                variant="link"
                label="Terms of service"
                to="/terms"
                trailing-icon="i-lucide-arrow-up-right"
                :ui="{ trailingIcon: 'size-3 align-top inline-block' }"
            />
        </nav>
        <LayoutColorModeSelect />
    </footer>
</template>
