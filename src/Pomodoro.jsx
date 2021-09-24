import React, { useEffect, useState } from "react";
import classNames from "./utils/class-names";
import useInterval from "./utils/useInterval";
import Timer from "./Timer";

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
      //onPlay();
    },
    isTimerRunning ? 1000 : null
  );

  // On Play/Pause
  function PlayPause() {
    // toggle timer
    setIsTimerRunning((prevState) => !prevState);
    if (focusCount === focusDuration * 60 && isTimerRunning === false) {
      setFocusCount(focusDuration * 60);
    }
    if (breakCount === breakDuration * 60 && isTimerRunning === false) {
      setBreakCount(breakDuration * 60);
    }
    if (isTimerRunning === true) {
      console.log("PAUSE");
      disableTimerBtns();
    } else if (isTimerRunning === false) {
      console.log("PLAY");
      enableStopButton();
      disableTimerBtns();
    }
  }

  // ON PLAY - runs every second
  const onPlay = () => {
    runFullSession();
    if (focusCount === 0 && breakCount === breakDuration * 60) handleAudio();
    if (breakCount === 0) handleAudio();
  };

  // ON STOP
  const onStop = () => {
    console.log("Stop");
    setIsTimerRunning(false);
    setIsFocus(true);
    setFocusCount(focusDuration * 60);
    setBreakCount(breakDuration * 60);
    disableStopButton();
    enableTimerButtons();
    // set session info
    const sessionInfo = document.querySelector("#sessionInfo");
    sessionInfo.classList.add("d-none");
    sessionInfo.classList.remove("d-block");
    const progressBar = document.querySelector(".progress");
    progressBar.classList.add("d-none");
    progressBar.classList.remove("flex");
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

  function enableStopButton() {
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.remove("disabled");
  }

  function disableStopButton() {
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.add("disabled");
    stopBtn.getAttribute("disabled", true);
  }

  function enableTimerButtons() {
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns) {
      btn.removeAttribute("disabled");
    }
  }

  function disableTimerBtns() {
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns) {
      btn.setAttribute("disabled", true);
    }
  }

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
          <Timer
            title="Focus Duration"
            upperLimit={60}
            lowerLimit={5}
            changeInterval={5}
            value={focusDuration}
            onChange={setFocusDuration}
            disabled={isTimerRunning}
          />
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
        <div className="row">
          <div className="col">
            <div
              className="btn-group btn-group-lg mb-2"
              role="group"
              aria-label="Timer controls"
            >
              <button
                type="button"
                className="btn btn-primary"
                data-testid="play-pause"
                title="Start or pause timer"
                onClick={PlayPause}
              >
                <span
                  className={classNames({
                    oi: true,
                    "oi-media-play": !isTimerRunning,
                    "oi-media-pause": isTimerRunning,
                  })}
                />
              </button>
              {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
              <button
                type="button"
                className="btn btn-secondary disabled"
                id="stopBtn"
                title="Stop the session"
                onClick={onStop}
              >
                <span className="oi oi-media-stop" />
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* TODO: This area should show only when a focus or break session is running or pauses */}
          <div className="row mb-2 d-none" id="sessionInfo">
            {/*
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
						*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
