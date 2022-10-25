import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          id: new Date().toISOString(),
          coachId: 'c1',
          userEmail: 'test@abc.com',
          message: 'Hi there! This is a test message!',
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
