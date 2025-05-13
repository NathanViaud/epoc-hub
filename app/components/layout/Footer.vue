<template>
    <footer class="flex items-center justify-between border-t border-(--ui-border) py-8">
        <span class="text-sm text-muted">
            Made with ❤️
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
