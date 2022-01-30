import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) { //update spots: decreasing spots
    //console.log(id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //if the user is editing an appointment, it shouldn't affect the spot count: 
    const editAppt = Boolean(state.appointments[id].interview);

   
    console.log(state.days[0].spots, "BEFORE")

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      
      const days = state.days.map((day) => {
        if (day.appointments.includes(id)) {
          return { ...day, spots: editAppt ? day.spots:  day.spots - 1}
        }
        return day;
      })
      //console.log("this is the days array:", days)
      setState({...state, appointments, days})
      //console.log("this is the state.days", state.days)
      console.log(state.days[0].spots, "AFTER")
    })
  }


  function cancelInterview(id) { //update spots 
    //console.log(state.appointment, "state.appointment log")
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
    //spot increases when a user canels an appointment: 
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return {...day, spots: day.spots + 1}
      }
      return day;
    })
    setState({...state, appointments, days});
    })
  }
  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {

      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}