// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ["@nuxt/ui", "@nuxthub/core", "@nuxt/image", "nuxt-auth-utils", "@nuxt/content", "@vueuse/nuxt"],

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

    compatibilityDate: "2024-11-27",
});