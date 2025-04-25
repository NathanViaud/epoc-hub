// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ["@nuxt/ui", "@nuxthub/core", "@nuxt/image"],

    css: ["~/assets/css/main.css"],

    future: {
        compatibilityVersion: 4,
    },

    hub: {
        blob: true,
        database: true,
    },

    devServer: {
        https: {
            key: "./localhost-key.pem",
            cert: "./localhost.pem",
        },
    },

    compatibilityDate: "2024-11-27",
});
