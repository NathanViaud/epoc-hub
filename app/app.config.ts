export default defineAppConfig({
    // https://ui.nuxt.com/getting-started/theme#design-system
    ui: {
        colors: {
            primary: "green",
            neutral: "zinc",
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
