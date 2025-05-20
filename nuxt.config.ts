import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        "@nuxt/ui",
        "@nuxthub/core",
        "@nuxt/image",
        "nuxt-auth-utils",
        "@nuxt/content",
        "@vueuse/nuxt",
        "shadcn-nuxt",
    ],

    css: ["~/assets/css/main.css"],

    future: {
        compatibilityVersion: 4,
    },

    hub: {
        blob: true,
        database: true,
    },

    nitro: {
        experimental: {
            tasks: true,
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },

    shadcn: {
        prefix: "",
        componentDir: "./app/components/ui",
    },

    compatibilityDate: "2024-11-27",
});
