export default eventHandler(async (event) => {
    return useDrizzle().select().from(tables.epocs).all();
});
