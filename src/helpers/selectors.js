export function getAppointmentsForDay(state, day) {
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