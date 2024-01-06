export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    token: useLocalStorage('token', ''),
    role: '',
  }),
  hydrate(state) {
    state.token = useLocalStorage('token', '');
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
