export default defineAppConfig({
    // https://ui.nuxt.com/getting-started/theme#design-system
    ui: {
        colors: {
            primary: "green",
            neutral: "slate",
        },
        button: {
            slots: {
                base: "cursor-pointer",
            },
            defaultVariants: {
                color: "neutral",
            },
        },
        input: {
            defaultVariants: {
                color: "neutral",
            },
        },
        dropdownMenu: {
            slots: {
                item: "cursor-pointer",
            },
        },
    },
});
