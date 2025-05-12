<template>
    <div class="flex flex-col gap-12 min-h-screen">
        <LayoutHeader />
        <UContainer class="flex-1">
            <slot />
        </UContainer>
        <UContainer>
            <LayoutFooter />
        </UContainer>
    </div>
</template>
