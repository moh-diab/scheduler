import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";


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
      .catch(err => console.log(err));



  }


  return (

    <article className="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <status message="saving" />
      )}

    </article>
  )
}