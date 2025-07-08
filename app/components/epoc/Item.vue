<script setup lang="ts">
import type { BlobObject } from "@nuxthub/core";
import { toast } from "vue-sonner";
import { Download, QrCode, Ellipsis, Copy, Trash } from "lucide-vue-next";

const props = defineProps<{
    id?: number;
    title: string;
    image?: string;
    path?: string;
    downloads?: number;
    libraryMode?: boolean;
    preview?: boolean;
}>();

const emit = defineEmits<{
    (e: "deleted", id: number): void;
}>();

const { data: metadata } = props.preview ? { data: undefined } : await useFetch<BlobObject>(`/api/files/${props.path}`);

const baseUrl = ref("");
onMounted(() => {
    baseUrl.value = `${window.location.origin}`;
});

const qrCodeComponent = useTemplateRef("qrCodeComponent");
function downloadQRCode() {
    if (!qrCodeComponent.value || !qrCodeComponent.value.qrCode) return;

    qrCodeComponent.value.qrCode.download({
        name: props.title + "_qr-code.png",
        extension: "png",
    });
}

async function copyLink() {
    await navigator.clipboard.writeText(`${baseUrl.value}/files/${props.path}`);
    toast.success("Link copied to clipboard");
}

async function deleteItem() {
    try {
        await $fetch(`/api/epocs/${props.id}`, {
            method: "DELETE",
        });
        toast.success("ePoc deleted successfully");
        emit("deleted", props.id!);
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete ePoc");
    }
}
</script>

<template>
    <Card class="pt-0 pb-4 overflow-hidden">
        <img v-if="image" :src="image" alt="Thumbnail" class="w-full aspect-square object-cover" />
        <img
            v-else
            src="/placeholder.png"
            alt="Default thumbnail"
            class="w-full aspect-square object-cover dark:invert p-4"
        />
        <CardContent class="flex flex-col flex-1 gap-4 px-4">
            <div class="space-y-1">
                <CardTitle class="text-lg">{{ title }}</CardTitle>
                <div class="flex justify-between text-muted-foreground">
                    <span v-if="metadata">{{ getSizeString(metadata.size) }}</span>
                    <span v-if="downloads !== undefined" class="items-center flex gap-1">
                        <Download class="size-4" />
                        {{ downloads }}
                    </span>
                </div>
            </div>
        </CardContent>
        <CardFooter v-if="!preview && path" class="gap-2 px-4">
            <Dialog>
                <DialogTrigger as-child class="flex-1">
                    <Button><QrCode />QR Code</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>QR Code</DialogTitle>
                    </DialogHeader>
                    <EpocQRCode ref="qrCodeComponent" :link="`${baseUrl}/files/${path}`" />

                    <DialogFooter>
                        <Button @click="downloadQRCode" class="w-full"><Download />Download</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button size="icon" variant="ghost"><Ellipsis /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem as-child>
                        <NuxtLink :to="`/files/${props.path}`" external> <Download /> Download </NuxtLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="copyLink"><Copy /> Copy link</DropdownMenuItem>
                    <template v-if="!libraryMode">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="deleteItem" variant="destructive"><Trash /> Delete</DropdownMenuItem>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardFooter>
    </Card>
</template>
