import React, { useEffect, useState } from "react";
import useInterval from "./utils/useInterval";
import Timer from "./Timer";
import SessionInfo from "./SessionInfo";
import PlayStopButtons from "./PlayStopButtons";
function Pomodoro() {
  // STATES
  //set focus
  const [focusDuration, setFocusDuration] = useState(25);
  const [focusCount, setFocusCount] = useState(focusDuration * 60);
  const [isFocus, setIsFocus] = useState(true);
  //set break
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakCount, setBreakCount] = useState(breakDuration * 60);
  //set progress bar
  let barWidth = 0;
  let ariaValue = 0;

  // TIMER
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      onPlay();
    },
    isTimerRunning ? 1000 : null
  );

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
  }, [focusDuration, breakDuration]);

  // RENDER
  return (
    <div className="container">
      <div className="pomodoro">
        <div className="row">
          {/* FOCUS TIMER */}
          <Timer
            title="Focus Duration"
            upperLimit={60}
            lowerLimit={1}
            changeInterval={1}
            value={focusDuration}
            onChange={setFocusDuration}
            disabled={isTimerRunning}
          />
          {/* BREAK TIMER */}
          <Timer
            title="Break Duration"
            upperLimit={15}
            lowerLimit={1}
            changeInterval={1}
            value={breakDuration}
            onChange={setBreakDuration}
            disabled={isTimerRunning}
          />
        </div>
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
