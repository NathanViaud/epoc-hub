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
                {
                    color: "neutral",
                    variant: "ghost",
                },
            ],
        },
        card: {
            slots: {
                root: "shadow dark:bg-muted",
            },
        },
        modal: {
            slots: {
                content: "shadow dark:bg-muted",
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
        // toast: {
        //     variants: {
        //         color: {
        //             success: {
        //                 root: "bg-success/10 ring-success/25",
        //                 title: "text-success",
        //             },
        //             error: {
        //                 root: "bg-error/10 ring-error/25",
        //                 title: "text-error",
        //             },
        //         },
        //     },
        // },
    },
});
