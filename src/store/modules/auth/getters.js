export default {
  userId(state){
    return state.userId;
  },
  token(state){
    return state.token;
  },
  tokenExpiration(state){
    return state.tokenExpiration;
  },
  email(state){
    return state.email;
  },
  isAuthenticated(state){
    return !!state.token;
  },
  didAutoLogout(state){
    return state.didAutoLogout;
  }

};