<script setup lang="ts">
import { Database, BrushCleaning, Loader } from "lucide-vue-next";
import { toast } from "vue-sonner";

definePageMeta({
    middleware: ["authenticated"],
    title: "Storage",
});

const { data: used, refresh } = await useFetch("/api/files/used");

const loading = ref(false);
async function cleanup() {
    loading.value = true;
    try {
        const { deleted } = await $fetch("/api/files/cleanup", {
            method: "POST",
        });

        toast.success(deleted ? `${deleted} files deleted` : "No unused files found");
        await refresh();
    } catch (e) {
        toast.error("Error during cleanup");
    }
    loading.value = false;
}
</script>

<template>
    <div class="space-y-5 w-full">
        <LayoutPageTitle />
        <Card class="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle class="flex items-center gap-2 text-xl">
                    <Database class="text-muted-foreground" /> Storage
                </CardTitle>
                <CardDescription>Informations about your currently used storage</CardDescription>
            </CardHeader>
            <CardContent>
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Used space</span>
                        <span>{{ used ? getSizeString(used) : 0 }}</span>
                    </li>

                    <Separator />

                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Cleanup</span>
                        <Button @click="cleanup" :disabled="loading">
                            <BrushCleaning v-if="!loading" /> <Loader v-else class="animate-spin" />Cleanup
                        </Button>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>
</template>
