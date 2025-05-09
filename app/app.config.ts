export default defineAppConfig({
    // https://ui.nuxt.com/getting-started/theme#design-system
    ui: {
        colors: {
            primary: "green",
            neutral: "zinc",
        },
        icons: {
            loading: "i-lucide-loader",
        },
        button: {
            slots: {
                base: "cursor-pointer",
            },
            defaultVariants: {
                color: "neutral",
            },
            compoundVariants: [
                {
                    color: "neutral",
                    variant: "solid",
                    class: "shadow-custom",
                },
            ],
        },
        card: {
            slots: {
                root: "shadow",
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
