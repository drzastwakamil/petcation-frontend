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
      const { token, role } = extractRoleAndToken(result);
      this.token = token;
      this.role = role;
    },
  },
  getters: {
    isLoggedIn: (state) => state.token.length > 0,
  },
});

function extractRoleAndToken(input: string): { role: string; token: string } {
  // Split the input string by line breaks
  const lines = input.split('\n');

  // Initialize variables to hold the role and token
  let role = '';
  let token = '';

  // Iterate over each line to find the role and token
  lines.forEach((line) => {
    if (line.startsWith('Role:')) {
      // Extract the role, trimming whitespace and the 'Role:' prefix
      role = line.replace('Role:', '').trim();
    } else if (line.startsWith('token:')) {
      // Extract the token, trimming whitespace and the 'token:' prefix
      token = line.replace('token:', '').trim();
    }
  });

  // Return an object containing the role and token
  return { role, token };
}
