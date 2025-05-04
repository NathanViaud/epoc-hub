export default defineNuxtRouteMiddleware(() => {
    const { loggedIn, user } = useUserSession();

    console.log("user", user.value);
    console.log("loggedIn", loggedIn.value);
    if (!loggedIn.value) {
        return navigateTo("/login");
    }
});
