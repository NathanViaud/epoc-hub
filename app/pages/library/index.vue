<script setup lang="ts">
definePageMeta({
    title: "My library",
});

const { data: library, refresh: refresh } = await useFetch("/api/library/self");

const toast = useToast();

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
    toast.add({ title: "Success", description: "Link copied to clipboard", color: "success" });

    setTimeout(() => {
        copied.value = false;
    }, 2000);
}

async function publishLibrary() {
    try {
        await $fetch("/api/library", {
            method: "POST",
        });
        toast.add({ title: "Library published successfully", color: "success" });
        await refresh();
    } catch (e) {
        toast.add({ title: "Error while publishing library", color: "error" });
    }
}

async function removeLibrary() {
    if (!library.value) return;

    try {
        await $fetch(`/api/library/${library.value.id}`, {
            method: "DELETE",
        });
        await refresh();
        toast.add({ title: "Your library has been removed", color: "info" });
    } catch (e) {
        toast.add({ title: "Your library could not be removed", color: "error" });
    }
}
</script>

<template>
    <div class="space-y-5 w-full">
        <LayoutPageTitle />
        <UCard :ui="{ body: 'flex flex-col gap-2 items-center' }" class="w-full max-w-4xl mx-auto">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-library" class="text-muted size-5" />
                    <h2 class="text-xl">My library</h2>
                </div>
                <p class="text-muted">Publish your library to create a public web page listing your ePocs.</p>
            </template>
            <ul class="w-full space-y-4">
                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Status</span>
                    <div class="flex items-center gap-2">
                        <UChip :color="library ? 'success' : 'error'" standalone inset class="relative" />
                        <UChip
                            v-if="library"
                            color="success"
                            standalone
                            inset
                            :ui="{ base: 'animate-ping' }"
                            class="absolute"
                        />
                        {{ library ? "Published" : "Not published" }}
                    </div>
                </li>

                <USeparator />

                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Link</span>
                    <ClientOnly v-if="library">
                        <UButtonGroup>
                            <UButton
                                :label="libraryUrl"
                                variant="outline"
                                trailing-icon="i-lucide-external-link"
                                :to="libraryUrl"
                                target="_blank"
                                external
                            />
                            <UButton
                                @click="copyUrl"
                                variant="outline"
                                :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                            />
                        </UButtonGroup>
                    </ClientOnly>
                    <p v-else>The library is not published yet</p>
                </li>

                <USeparator />

                <li class="flex items-center">
                    <span class="flex-1 font-semibold">Action</span>
                    <UButton
                        :label="library ? 'Remove library' : 'Publish library'"
                        :icon="library ? 'i-lucide-trash' : 'i-lucide-share'"
                        :color="library ? 'error' : 'neutral'"
                        @click="library ? removeLibrary() : publishLibrary()"
                    />
                </li>
            </ul>
        </UCard>
    </div>
</template>
