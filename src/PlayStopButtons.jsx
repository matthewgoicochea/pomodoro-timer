import React from "react";
import classNames from "./utils/class-names";

function PlayStopButtons({
  isTimerRunning,
  setIsTimerRunning,
  setIsFocus,
  setFocusCount,
  focusDuration,
  setBreakCount,
  breakDuration,
  focusCount,
  breakCount,
}) {
  // On Play/Pause
  function playPause() {
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

  // Helpers
  function disableStopButton() {
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.add("disabled");
    stopBtn.getAttribute("disabled", true);
  }

  function enableStopButton() {
    const stopBtn = document.querySelector("#stopBtn");
    stopBtn.classList.remove("disabled");
  }

  function disableTimerBtns() {
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns) {
      btn.setAttribute("disabled", true);
    }
  }

  function enableTimerButtons() {
    const timerBtns = document.querySelectorAll("#timerButton");
    for (let btn of timerBtns) {
      btn.removeAttribute("disabled");
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          {/* PLAY/PAUSE BTN: starts/pauses session */}
          <button
            type="button"
            className="btn btn-primary shadow-none"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !isTimerRunning,
                "oi-media-pause": isTimerRunning,
              })}
            />
          </button>
          {/* STOP BTN: stops session and disables when no active session */}
          <button
            type="button"
            className="btn btn-secondary shadow-none disabled"
            id="stopBtn"
            title="Stop the session"
            onClick={onStop}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayStopButtons;
