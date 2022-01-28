import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Error from "components/Appointment/Error";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  // const ERROR_SAVING = "ERROR_SAVING";
  // const ERROR_DELETING = "ERROR_DELETING";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
   //need to have a Promise here to wait for the axios put 
   Promise.resolve(props.bookInterview(props.id, interview))
   .then(() => transition(SHOW))
   .catch(err=> console.log(err)); 
  }

  const deleteConfirmation = () => {
    transition(CONFIRM, true);
  };

  const deleteAppointment = () => {
    transition(DELETING, true);

    //console.log(props, "this is the props from index.js")
    Promise.resolve(props.cancelInterview(props.id))
    .then(() => transition(EMPTY))
    .catch(err=>console.log(err)); 
  };

  
  return (

    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE)}}/>}

      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteConfirmation}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers ={props.interviewers} 
        onSave={save} 
        onCancel={back} 
        /> 
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm 
        onConfirm={deleteAppointment}
        onCancel={() => back()}
        message="Are you sure you want to delete?" 
        />
      )} 
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}
    </article>
  )
}