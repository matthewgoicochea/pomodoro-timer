import React from "react";
import { minutesToDuration } from "../utils/duration";

function Timer({
  title,
  disabled,
  lowerLimit,
  upperLimit,
  value,
  changeInterval,
  onChange,
}) {
  return (
    <>
      <span className="input-group-text" data-testid="duration-focus">
        {/* TODO: Update this text to display the current focus session duration */}
        {title}: {minutesToDuration(value)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          disabled={disabled || value === lowerLimit}
          className="btn btn-secondary"
          id="timerButton"
          data-testid="decrease-focus"
          onClick={() =>
            onChange((prevValue) =>
              prevValue - changeInterval >= lowerLimit
                ? prevValue - changeInterval
                : prevValue
            )
          }
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          disabled={disabled || value === upperLimit}
          className="btn btn-secondary"
          id="timerButton"
          data-testid="increase-focus"
          onClick={() =>
            onChange((prevValue) =>
              prevValue + changeInterval <= upperLimit
                ? prevValue + changeInterval
                : prevValue
            )
          }
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </>
  );
}

export default Timer;
