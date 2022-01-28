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
  const EDIT ="EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


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
      .catch(err => {
        transition(ERROR_SAVE, true)
        console.log(err)
      })
    }
  // const deleteConfirmation = () => {
  //   transition(CONFIRM, true);
  // };

  const deleteAppointment = () => {
    transition(DELETING, true);

    //console.log(props, "this is the props from index.js")
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true)
        console.log(err)
      });
  };


  return (

    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}

      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === EDIT && (
        <Form 
        name={props.interview.student}
        interview={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message="Unable to save, try again"
        onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Unable to delete"
        onClose={() => back()}
        />
      )}
    </article>
  )
}