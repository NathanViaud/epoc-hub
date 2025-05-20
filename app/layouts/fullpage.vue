<template>
    <div class="flex flex-col gap-12 min-h-screen">
        <LayoutHeader />
        <LayoutContainer class="flex-1">
            <slot />
        </LayoutContainer>
        <LayoutContainer>
            <LayoutFooter />
        </LayoutContainer>
    </div>
</template>
