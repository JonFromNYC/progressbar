import React, {useState} from "react";
import Exercise from "../exercise/Exercise";
import ProgressBar from './ProgressBar';
import Button from './Button';

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [value, updateValue] = useState(0);
  const [status, setStatus] = useState("Start Request");

  const interval = function(){
    setInterval(()=>{ 
      updateValue(oldValue => {
        // keep updating progress bar for ~17 seconds
        // const newValue = oldValue + 6.25;
        const newValue = oldValue <= 90 ? oldValue + 10: oldValue;
        if(newValue === 90){ // Check to see if progress reached 100%
          setStatus("Start Request"); // Reset button text
          
          // clearInterval(interval); // stop the interval
          clearAllIntervals(); // stop the interval
          return 90;
        }
        return newValue; // return this value every interval to update progress bar
      });
    }, 1000)}; // end 1 second intervals
  
  const startFakeRequest = () => {
    // start an interval for 17 to 20 seconds
    setStatus("Loading");
    interval();
  }; 

  const clearAllIntervals = () => {
    // Get a reference to the last interval + 1
    const interval_id = 
      window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }

  const stopRequest = () => {
      updateValue(100);
      clearAllIntervals();
      setTimeout(()=>{
        updateValue(0);
        setStatus("Start Request");
      },500);
  };

  return ( 
    <div>
      <ProgressBar value={value} />
      <Button status={status} id="start" onClick={()=>startFakeRequest()} look={'btn btn--green'}/>
      <Button status={"Stop"} id="stop" onClick={()=>stopRequest()} look={'btn btn--red'}/>
    </div>);
};
