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

function getInterviewersForDay(state, day) {

  const result = []; 
  const currentDay = state.days.filter(obj => obj.name === day)[0];

  if (!currentDay) {
    return result;
  }
  for (const id of currentDay.interviewers) {
    result.push(state.interviewers[id]);
  }
  return result;
}
export { getAppointmentsForDay, getInterview, getInterviewersForDay }