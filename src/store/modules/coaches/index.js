import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
    };
  },
  mutations,
  actions,
  getters,
};

// Old Dummy Data for coaches
// {
//   id: 'c1',
//   firstName: 'Luke',
//   lastName: 'Skywalker',
//   areas: ['frontend', 'backend', 'career'],
//   description:
//     "I've worked as a freelance web developer for years on many different kinds of space craft. Let me help you become a developer as well!",
//   hourlyRate: 30,
// },
// {
//   id: 'c2',
//   firstName: 'Indiana',
//   lastName: 'Jones',
//   areas: ['frontend', 'career'],
//   description:
//     'When I\'m not being an archeologist, I work as a senior developer in a big tech company. I can help you get your first job or progress in your current role.',
//   hourlyRate: 30,
// },
