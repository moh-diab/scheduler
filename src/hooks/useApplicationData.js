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

  function bookInterview(id, interview) {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => setState({...state, appointments}));
  }

  function cancelInterview(id) {
    //console.log(state.appointment, "state.appointment log")
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log("this is state&appointments in application:", state, appointments)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({...state, appointments}));
  };

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {

      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      //console.log("all:", all[1].data)
      //console.log("this is the interviewers:", state.interviewers)
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
      // setDay(all[0])
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

// Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.