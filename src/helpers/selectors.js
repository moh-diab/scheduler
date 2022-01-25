function getAppointmentsForDay(state, day) {
  //return an array of appointments for that day
  if(!state.days){
    return [];
  }

  let currentDay = state.days.filter(obj => obj.name === day)[0];
  if(!currentDay){
    return [];
  }

  let apptArray = [];
  for (const id of currentDay.appointments) {
    const existingAppt = state.appointments[id];
    apptArray.push(existingAppt);
  }
  return apptArray;
}


// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

function getInterview(state, interview) {

  let interviewObj = state.interviewers;

  if (!interview || !interviewObj){
    return null;
  } 
  else {
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  } 
};

export { getAppointmentsForDay, getInterview }