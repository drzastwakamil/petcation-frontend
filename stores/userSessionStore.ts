export const useUserSessionStore = defineStore('userSession', {
  state: () => ({
    token: useLocalStorage('token', ''),
  }),
  hydrate(state, initialState) {
    state.token = useLocalStorage('token', '');
  },
  actions: {
    logOut() {
      this.token = '';
    },
    logIn(token: string) {
      this.token = token;
    },
  },
  getters: {
    isLoggedIn: (state) => state.token.length > 0,
  },
});
