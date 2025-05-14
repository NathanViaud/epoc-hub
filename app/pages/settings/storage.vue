<script setup lang="ts">
definePageMeta({
    middleware: ["authenticated"],
    title: "Storage",
});

const { data: used, refresh } = await useFetch("/api/files/used");

const toast = useToast();
async function cleanup() {
    try {
        const { deleted } = await $fetch("/api/files/cleanup", {
            method: "POST",
        });

        toast.add({
            title: "Success",
            description: deleted ? `${deleted} files deleted` : "No unused files found",
            color: "success",
        });
        await refresh();
    } catch (e) {
        toast.add({ title: "Error during cleanup", color: "error" });
    }
}
</script>

<template>
    <div class="space-y-5 w-full">
        <LayoutPageTitle />
        <UCard class="w-full max-w-4xl mx-auto">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-database" class="text-muted size-5" />
                    <h2 class="text-xl">Storage</h2>
                </div>
            </template>
            <ul class="w-full space-y-4">
                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Used space</span>
                    <span>{{ used ? getSizeString(used) : 0 }}</span>
                </li>

                <USeparator />
                <li class="flex items-center">
                    <div class="space-y-2 flex-1">
                        <span class="font-semibold">Cleanup</span>
                        <p class="text-muted text-sm">
                            Fix storage mismatches by deleting files not linked to your library.
                            <br />
                            This can happen if an error occurs on our end.
                        </p>
                    </div>
                    <UButton icon="i-lucide-brush-cleaning" label="Cleanup" @click="cleanup" />
                </li>
            </ul>
        </UCard>
    </div>
</template>
