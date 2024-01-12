export default defineNuxtRouteMiddleware(() => {
  if (useUserSessionStore().isLoggedIn) {
    return;
  }
  return abortNavigation();
});
