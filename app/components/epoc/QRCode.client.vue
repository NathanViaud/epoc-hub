<script setup lang="ts">
import QRCodeStyling from "qr-code-styling";

const props = defineProps<{
    link: string;
}>();

const canvas: Ref<HTMLDivElement | undefined> = ref();
const qrCode: Ref<QRCodeStyling | undefined> = ref();

qrCode.value = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: props.link,
    dotsOptions: {
        color: "#000000",
        type: "square",
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
    },
});

onMounted(async () => {
    if (!qrCode.value) return;

    await nextTick();
    qrCode.value.append(canvas.value);
});

defineExpose({
    qrCode,
});
</script>

<template>
    <div class="bg-white p-5 rounded-md">
        <div ref="canvas" class="w-fit mx-auto"></div>
    </div>
</template>
