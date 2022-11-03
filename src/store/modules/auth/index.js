import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  // Not namespaced since "userId" was in the global state in root index and was accessed via the getter there.
  // However, bother were moved into auth module, so by not namespacing, they will still be merged into root without any adjustments to names.
  state() {
    return {
      userId: null,
      token: null,
      email: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
