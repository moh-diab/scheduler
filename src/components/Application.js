import React, { useState, useEffect } from "react";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
  });



  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const setDay = day => setState({ ...state, day });

  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  useEffect(() => {

    const days = "http://localhost:8001/api/days";
    const appointments = "http://localhost:8001/api/appointments"
    const interviewers = "http://localhost:8001/api/interviewers"

    Promise.all([
      axios.get(days),
      axios.get(appointments),
      axios.get(interviewers),
    ]).then((all) => {
      console.log("all:", all[1].data)
      console.log("this is the interviewers:", state.interviewers)
      setState({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      // setDay(all[0])
    })
  }, []);
  //console.log("this is the state from Application.js", state)
  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {console.log("state.appointments:", state.appointments)}
        {
          //console.log("dailyAppointment from Application.js:", appointments);
          dailyAppointments.map((appointment) => {
            return (
              <Appointment
                key={appointment.id}
                // id={appointment.id}
                // time={appointment.time}
                // interview={appointment.interview}
                {...appointment}
              />
            )
          })
        }
      </section>
    </main>
  );
}