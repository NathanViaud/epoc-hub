<script setup lang="ts">
import { toast } from "vue-sonner";
import { Library, Copy, ExternalLink, Trash, Share } from "lucide-vue-next";

definePageMeta({
    title: "My library",
});

const { data: library, refresh: refresh } = await useFetch("/api/library/self");

const baseUrl = ref("");
onMounted(() => {
    baseUrl.value = `${window.location.origin}`;
});
const libraryUrl = computed(() => `${baseUrl.value}/library/${library.value?.id}`);

const copied = ref(false);
async function copyUrl() {
    copied.value = true;
    if (!library.value) return;
    await navigator.clipboard.writeText(libraryUrl.value);
    toast.success("Link copied to clipboard");

    setTimeout(() => {
        copied.value = false;
    }, 2000);
}

async function publishLibrary() {
    try {
        await $fetch("/api/library", {
            method: "POST",
        });
        toast.success("Library published successfully");
        await refresh();
    } catch (e) {
        toast.error("Error while publishing library");
    }
}

async function removeLibrary() {
    if (!library.value) return;

    try {
        await $fetch(`/api/library/${library.value.id}`, {
            method: "DELETE",
        });
        await refresh();
        toast.info("Your library has been removed");
    } catch (e) {
        toast.error("Your library could not be removed");
    }
}
</script>

<template>
    <div class="space-y-5 w-full">
        <LayoutPageTitle />
        <Card class="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle class="flex items-center gap-2 text-xl">
                    <Library class="text-muted-foreground" /> My library
                </CardTitle>
                <CardDescription>Manage your library here</CardDescription>
            </CardHeader>
            <CardContent>
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Status</span>
                        <div class="flex items-center gap-2">
                            <div
                                class="rounded-full size-2 relative"
                                :class="[library ? 'bg-emerald-500' : 'bg-red-500']"
                            />
                            <div v-if="library" class="rounded-full size-2 bg-emerald-500 absolute animate-ping" />

                            {{ library ? "Published" : "Not published" }}
                        </div>
                    </li>

                    <Separator />

                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Link</span>
                        <ClientOnly v-if="library">
                            <Button variant="outline" class="rounded-e-none" as-child>
                                <NuxtLink :to="libraryUrl" target="_blank">{{ libraryUrl }} <ExternalLink /></NuxtLink>
                            </Button>
                            <Button @click="copyUrl" size="icon" variant="outline" class="border-s-0 rounded-s-none">
                                <Copy />
                            </Button>
                        </ClientOnly>
                        <p v-else>The library is not published yet</p>
                    </li>

                    <Separator />

                    <li class="flex items-center">
                        <span class="flex-1 font-semibold">Action</span>
                        <Button
                            @click="library ? removeLibrary() : publishLibrary()"
                            :variant="library ? 'destructive' : 'default'"
                        >
                            <component :is="library ? Trash : Share" />
                            {{ library ? "Remove library" : "Publish library" }}
                        </Button>
                    </li>
                </ul>
            </CardContent>
        </Card>
    </div>
</template>
