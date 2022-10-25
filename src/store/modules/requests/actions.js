export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://find-a-coach-f01cc-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if(!response.ok){
      console.log('Error with POST request to server',  responseData.message);
      throw new Error(responseData.message || 'Failed POST request.');
    }
    
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    console.log(responseData, newRequest);

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context){
    const coachId = context.rootGetters.userId;
    const response = await fetch(`https://find-a-coach-f01cc-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`);

    const responseData = await response.json();

    if(!response.ok){
      console.log('Error with GET request to server',  responseData.message);
      throw new Error(responseData.message || 'Failed GET request.');
    }

    const requests = [];
    for(const key in responseData){
      const request = {id: key, coachId, message: responseData[key].message, userEmail: responseData[key].userEmail, };
      requests.push(request);
    }

    console.log(requests);
    context.commit('setRequests', requests);
  }
};

// {-NF7zsOfyRFbklv7ouS6: {…}}-NF7zsOfyRFbklv7ouS6: {message: 'Hey there! Can you teach me?', userEmail: 'cereal_pjs@yahoo.ca'}[[Prototype]]: Object 