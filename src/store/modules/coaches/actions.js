export default {
 async registerCoach(context, { first, last, rate, desc, areas }) {
    const userId = context.rootGetters.userId;
    console.log('userId: ', userId);
    const coachData = {
      firstName: first,
      lastName: last,
      description: desc,
      hourlyRate: rate,
      areas,
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-a-coach-f01cc-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    await response.json();
    if(!response.ok) console.log('Error occurred when sending PUT request to server', response);

    context.commit('registerCoach', {...coachData, id: userId});
  },

  async loadCoaches(context, payload){
    if(!payload.forceRefresh && !context.getters.shouldUpdate) return;

    const response = await fetch( `https://find-a-coach-f01cc-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
    const responseData = await response.json();
    
    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    
    const coaches = [];
    for( const key in responseData){
      const coach = {id: key, firstName: responseData[key].firstName, lastName: responseData[key].lastName, areas: responseData[key].areas, description: responseData[key].description, hourlyRate: responseData[key].hourlyRate};
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};


// id: 'c2',
// firstName: 'Indiana',
// lastName: 'Jones',
// areas: ['frontend', 'career'],
// description:
//   'When I\'m not being an archeologist, I work as a senior developer in a big tech company. I can help you get your first job or progress in your current role.',
// hourlyRate: 30,
// const data = {id: userId, firstName: responseData.firstName, lastName: responseData.lastName, areas: responseData.areas, description: responseData.description, hourlyRate: responseData.hourlyRate};