export default defineNuxtRouteMiddleware(() => {
  if (useUserSessionStore().isLoggedIn) {
    return;
  }

  return navigateTo(useBrowsingStore().lastVisitedNonAuthPage);
});
