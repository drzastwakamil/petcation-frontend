export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    isLoggedIn: false,
  }),

  actions: {
    logIn() {
      this.isLoggedIn = true;
    },

    logOut() {
      this.isLoggedIn = false;
    },
  },
});
