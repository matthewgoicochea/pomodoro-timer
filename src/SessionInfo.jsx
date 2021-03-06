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
      {/* Shows only when a focus or break session is running/paused */}
      <div className="col">
        {/* Update title to show current session and total duration */}
        <h2 data-testid="session-title">
          <SessionTitle
            isFocus={isFocus}
            focusDuration={focusDuration}
            breakDuration={breakDuration}
          />
        </h2>
        {/* Update message to show time remaining in current session */}
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
