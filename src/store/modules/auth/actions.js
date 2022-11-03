let timer; // keeps track of expiration time of token

export default {
  // == logout ==
  logout(context) {
    console.log('logging user out...');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null,
      email: null,
    });
  },

  // == Auto Logout ==
  autoLogout(context){
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },

  // == Auth ==
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlvuNcWaw9BOdaY2Ash2jq-TLiU8M86o4';
    if (mode === 'signup')
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvuNcWaw9BOdaY2Ash2jq-TLiU8M86o4';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      throw new Error(
        responseData.error.message || 'Failed to login to account'
      );
    }

    const { idToken, email, expiresIn, localId } = responseData;
    const expiryTime = (+expiresIn) * 1000; // (3600 * 1000)ms = 1hr
    const expirationDate = Date.now() + expiryTime; 
    console.log('expirationDate', expirationDate);

    localStorage.setItem('tokenExpiration', expirationDate);
    localStorage.setItem('token', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem('email', email);

    // clearTimeout() timer when logging out
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiryTime);

    context.commit('setUser', {
      userId: localId,
      email,
      token: idToken,
    });
  },
  // == login == TODO: Refactor login() and signup() since mostly duplicate code
  async login(context, payload) {
    console.log('login() called..', payload);
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },

  // tries to login on page load
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    const expiryTime = (+tokenExpiration) - Date.now();
    if(expiryTime <= 0 ) return; // token is invalid

    // clearTimeout() timer when logging out
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiryTime);

    if (token && userId) context.commit('setUser', { token, userId, email });
  },
  // == signup ==
  async signup(context, payload) {
    console.log('signup() called..', payload);
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
};

// form of object from Firebase
// {email: "cereal_pjs@yahoo.ca"
// expiresIn: "3600"
// idToken: "eyJh"
// kind: "identitytoolkit#SignupNewUserResponse"
// localId: "n2AjUNHP5NdpAwDfjZpbaRYeHHX2"
// refreshToken: "AOEOu"}
