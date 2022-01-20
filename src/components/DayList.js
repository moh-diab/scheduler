import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const dayItem = props.days.map((day, index) => {
    return (
      <DayListItem
        key={index}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {dayItem}
    </ul>);
}