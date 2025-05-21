<script setup lang="ts">
definePageMeta({
    layout: "fullpage",
});
</script>

<template>
    <Tabs default-value="login" class="w-full max-w-2xl mx-auto">
        <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="register">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
            <AuthLogin />
        </TabsContent>
        <TabsContent value="register">
            <AuthRegister />
        </TabsContent>
    </Tabs>
</template>
