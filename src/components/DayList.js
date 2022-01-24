import React from "react";
import DayListItem from "components/DayListItem";

// export default function Daylist({days, selectedDay, setDay} = this.props) {

//   //console.log("this is the day", days);

//   return (
//     <ul>
//     {days.map(day => (
//         <DayListItem
//         key={day.id}
//         name={day.name}
//         spots={day.spots}
//         selected={day.name === selectedDay}
//         setDay = {setDay}
//         />

//     ))}  
//   </ul>
//   );
// }

export default function DayList(props) {

  const days = props.days;
  //console.log("this is the props:", props)

  //console.log("this is the props.day from DayList", props.day);
  const daysListItem = days.map((day) => {
    //console.log("this is the day name from DayList", day.name);
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />

  });

  return (
    <ul>
      {days.length > 0 ? daysListItem : null}
    </ul>
  )
}