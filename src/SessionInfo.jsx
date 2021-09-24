import React from "react";
import SessionTitle from "./SessionTitle";
import TimeRemaining from "./TimeRemaining";
import Audio from "./Audio";
import Paused from "./Paused";
import ProgressBar from "./ProgressBar";

function SessionInfo({
  isFocus,
  focusDuration,
  breakDuration,
  focusCount,
  breakCount,
  isTimerRunning,
  barWidth,
  ariaValue,
}) {
  function showSessionInfo() {
    const sessionInfo = document.querySelector("#sessionInfo");
    sessionInfo.classList.add("d-block");
    sessionInfo.classList.remove("d-none");
    const progressBar = document.querySelector(".progress");
    progressBar.classList.add("flex");
    progressBar.classList.remove("d-none");
  }

  if (isTimerRunning) {
    showSessionInfo();
  }

  return (
    <div className="row mb-2 d-none" id="sessionInfo">
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
        <h2 data-testid="session-title">
          <SessionTitle
            isFocus={isFocus}
            focusDuration={focusDuration}
            breakDuration={breakDuration}
          />
        </h2>
        {/* TODO: Update message below to include time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          <TimeRemaining
            isFocus={isFocus}
            focusCount={focusCount}
            breakCount={breakCount}
          />{" "}
          remaining
        </p>
        <Audio />
        <Paused isTimerRunning={isTimerRunning} />
      </div>
      <ProgressBar barWidth={barWidth} ariaValue={ariaValue} />
    </div>
  );
}

export default SessionInfo;
