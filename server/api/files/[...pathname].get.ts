export default eventHandler(async (event) => {
    const { pathname } = getRouterParams(event);

    console.log("pathname", pathname);
    return hubBlob().head(pathname);
});
