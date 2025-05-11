export default eventHandler(async (event) => {
    await requireUserSession(event);

    const { pathname } = getRouterParams(event);

    return hubBlob().head(pathname);
});
