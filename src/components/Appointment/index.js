import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  console.log("props from Appointment index.js:", props)
  return(
    
    <article className="appointment">
      {/* all appointment component will render a header && time prop: */}
      <Header time={props.time} />

       {/* if props.interview is truthy, the appointment will render the <Show />, else will render <Empty /> */}
      {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}

      {!props.interviewer && <Empty onClick={props.onAdd} />}
      
    </article>
  )
}