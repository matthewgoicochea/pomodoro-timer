import React, { useEffect, useState } from "react";
import useInterval from "./utils/useInterval";
import DurationButtons from "./DurationButtons";
import SessionInfo from "./SessionInfo";
import PlayStopButtons from "./PlayStopButtons";
function Pomodoro() {
  const [focusDuration, setFocusDuration] = useState(30);
  const [focusCount, setFocusCount] = useState(focusDuration * 60);
  const [isFocus, setIsFocus] = useState(true);
  const [breakDuration, setBreakDuration] = useState(10);
  const [breakCount, setBreakCount] = useState(breakDuration * 60);

  // TIMER
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useInterval(
    () => {
      // runs while timer is running
      onPlay();
    },
    isTimerRunning ? 1000 : null
  );

  const [state, setState] = useState({
    disabled: isTimerRunning,
    focusDuration: 30,
    focusUpperLimit: 60,
    focusLowerLimit: 10,
    focusChangeInterval: 5,
    breakDuration: 10,
    breakChangeInterval: 1,
    breakUpperLimit: 30,
    breakLowerLimit: 1,
  });
  //set progress bar
  let barWidth = 0;
  let ariaValue = 0;

  // ON PLAY - runs every second
  const onPlay = () => {
    runFullSession();
    if (focusCount === 0 && breakCount === breakDuration * 60) handleAudio();
    if (breakCount === 0) handleAudio();
  };

  // Session Handler
  function runFullSession() {
    if (focusCount > 0) {
      setFocusCount((prevCount) => prevCount - 1);
    } else {
      setIsFocus(false);
      if (breakCount > 0) {
        setBreakCount((prevCount) => prevCount - 1);
      } else {
        console.log("Restarting Session");
        setIsFocus(true);
        setFocusCount(focusDuration * 60);
        setBreakCount(breakDuration * 60);
      }
    }
    // set progress bar values
    if (isFocus) {
      const timeElapsedA = focusDuration * 60 - focusCount;
      let percentA = (timeElapsedA / (focusDuration * 60)) * 100;
      const bar = document.querySelector(".progress-bar");
      bar.style.width = `${percentA}%`;
      bar.setAttribute("aria-valuenow", percentA.toFixed(2));
    } else {
      const timeElapsedB = breakDuration * 60 - breakCount;
      let percentB = (timeElapsedB / (breakDuration * 60)) * 100;
      const bar = document.querySelector(".progress-bar");
      bar.style.width = `${percentB}%`;
      bar.setAttribute("aria-valuenow", percentB.toFixed(2));
    }
  }

  // Helpers
  const audioElement = document.getElementsByClassName("audio")[0];

  function handleAudio() {
    audioElement.play();
  }

  // Handler
  useEffect(() => {
    if (!isTimerRunning) {
      setFocusCount(focusDuration * 60);
      setBreakCount(breakDuration * 60);
    }
  }, [focusDuration, breakDuration, isTimerRunning]);

  // RENDER
  return (
    <div className="container">
      <div className="pomodoro">
        <DurationButtons
          state={state}
          setState={setState}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          setFocusDuration={setFocusDuration}
          setBreakDuration={setBreakDuration}
        />
        <PlayStopButtons
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          setIsFocus={setIsFocus}
          setFocusCount={setFocusCount}
          focusDuration={focusDuration}
          setBreakCount={setBreakCount}
          breakDuration={breakDuration}
          focusCount={focusCount}
          breakCount={breakCount}
        />
        {/* shows only during active focus or break session */}
        <SessionInfo
          isFocus={isFocus}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          focusCount={focusCount}
          breakCount={breakCount}
          isTimerRunning={isTimerRunning}
          barWidth={barWidth}
          ariaValue={ariaValue}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
