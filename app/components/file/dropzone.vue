<script setup lang="ts">
import { type FileRejectReason, useDropzone } from "vue3-dropzone";
import { useVModel } from "@vueuse/core";
import { Upload, X } from "lucide-vue-next";

const props = defineProps<{
    modelValue: File[];
}>();

const emits = defineEmits<{
    (e: "update:modelValue", payload: File | File[]): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
});

function onDrop(acceptFiles: any[], rejectReasons: FileRejectReason[]) {
    modelValue.value = acceptFiles;
}

function removeFile() {
    modelValue.value = [];
}

const { getRootProps, getInputProps, ...rest } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".epoc",
});

const { isDragActive } = rest;
</script>

<template>
    <div class="space-y-6">
        <div
            v-bind="getRootProps()"
            class="w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/25 transition h-52 flex items-center text-muted-foreground"
        >
            <div class="flex flex-col gap-4 place-items-center w-full">
                <input v-bind="getInputProps()" />
                <div class="rounded-full border border-dashed p-4 w-fit">
                    <Upload />
                </div>
                <p v-if="isDragActive">Drop files here</p>
                <p v-else>Click or drag files here</p>
            </div>
        </div>
        <div v-if="modelValue[0]" class="flex items-center w-full gap-2">
            <p class="text-sm">{{ modelValue[0].name }}</p>
            <p class="text-xs text-muted-foreground flex-1">{{ getSizeString(modelValue[0].size) }}</p>
            <Button @click="removeFile" size="icon" variant="outline" class="size-7" :icon="X" />
        </div>
    </div>
</template>
