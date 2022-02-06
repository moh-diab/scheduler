// //take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

const { useState } = require("react");

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]); // This line is new!
  // the rest of your code //

  function transition(newMode, replacing = false) {
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replacing) {
        newHistory.pop();
      } return [...newHistory, newMode];
    });
  }

  const back = () => {


    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));

    }
    console.log(history);
  };

  const mode = history[history.length - 1];

  return { mode, transition, back };
}

