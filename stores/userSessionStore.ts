export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    token: useLocalStorage('token', ''),
    role: useLocalStorage('role', ''),
  }),
  hydrate(state) {
    state.token = useLocalStorage('token', '');
    state.role = useLocalStorage('role', '');
  },
  actions: {
    logOut() {
      this.token = '';
      this.role = '';
    },
    logIn(result) {
      const { token, role } = result;
      this.token = token;
      this.role = role;
    },
    openLoginModal() {},
  },
  getters: {
    isLoggedIn: (state) => state.token.length > 0,
  },
});
