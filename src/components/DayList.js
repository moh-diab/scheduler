import React from "react";
import DayListItem from "components/DayListItem";

export default function Daylist({days, selectedDay, setDay} = this.props) {
  
  console.log("this is the day", days);
  return (
    <ul>
    {days.map(day => (
        <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === selectedDay}
        setDay = {setDay}
        />
    
    ))}  
  </ul>
  );
}