// //take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

const { useState } = require("react");

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!
  // the rest of your code //


  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(prevHistory => [...prevHistory, newMode]);
      setMode(newMode);
    } else {
      const newHistory = [...history];
      newHistory.pop();

      setHistory(prevHistory => [...newHistory, newMode]);
     
      setMode(newMode);
    }
  }
  const back = () => {
    if (mode === initial) {
      return;
    }

    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));

      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}