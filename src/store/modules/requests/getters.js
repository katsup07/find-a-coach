export default{
  getRequests(state, getters, rootState, rootGetters){
    const coachId = rootGetters.userId;
    const filteredRequests = state.requests.filter( req => req.coachId === coachId);
    return filteredRequests;
  },
  hasRequests(state, getters){
    return getters.getRequests && getters.getRequests.length > 0;
  }
}