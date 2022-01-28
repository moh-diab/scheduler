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

  function bookInterview(id, interview) { //update spots: decrease spots
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    function decreaseSpots() {
      const availableDays = [...state.days];
      availableDays.map((day) => {
        for(const appointment of day.appointments){
          if(appointment === id) {
            day.spots--;
          }
        }
      })
      return availableDays;
    }

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      decreaseSpots();
      setState({...state, appointments})
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

    function increaseSpots() {
      const availableDays = [...state.days];
      availableDays.map((day) => {
        for(const appointment of day.appointments){
          if(appointment === id) {
            day.spots++;
          }
        }
      })
      return availableDays;
    }
    //console.log("this is state&appointments in application:", state, appointments)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
    increaseSpots();
    setState({...state, appointments});
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

      //console.log("all:", all[1].data)
      //console.log("this is the interviewers:", state.interviewers)
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
      // setDay(all[0])
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}