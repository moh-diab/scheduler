import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // InterviewerList passes the setInterviewer function down to the InterviewerListItem

  console.log("InterviewerList.js props.interviewers =", props.interviewers);

  const interviewers = props.interviewers.map(interviewer => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}