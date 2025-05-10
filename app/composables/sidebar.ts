export const useSidebar = () => {
    const collapsed = useState("collasped", () => false);
    const opened = useState("opened", () => false);

    return { opened, collapsed };
};
