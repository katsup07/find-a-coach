export default {
  setUser(state, { token, userId, email }) {
    console.log('setUser() mutation...');
    state.token = token;
    state.userId = userId;
    state.email = email;
    state.didAutoLogout = false;
    console.log('auth-state: ', state);
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
