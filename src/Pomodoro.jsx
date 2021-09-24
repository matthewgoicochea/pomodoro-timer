import React, { useEffect, useState } from "react";
import classNames from "./utils/class-names";
import useInterval from "./utils/useInterval";

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
    /*
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
	*/
  }

  // ON STOP
  const onStop = () => {
    /*
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
		*/
  };

  // RENDER
  return (
    <div className="container">
      <div className="pomodoro">
        <div className="row">
          <div className="col">
            <div className="input-group input-group-lg mb-2">
              {/* <Timer
                title="Focus Duration"
                upperLimit={60}
                lowerLimit={5}
                changeInterval={5}
                value={focusDuration}
                onChange={setFocusDuration}
                disabled={isTimerRunning}
              />*/}
            </div>
          </div>
          <div className="col">
            <div className="float-right">
              <div className="input-group input-group-lg mb-2">
                {/*<Timer
                  title="Break Duration"
                  changeInterval={1}
                  value={breakDuration}
                  onChange={setBreakDuration}
                  disabled={isTimerRunning}
                  upperLimit={15}
                  lowerLimit={1}
								/>*/}
              </div>
            </div>
          </div>
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
