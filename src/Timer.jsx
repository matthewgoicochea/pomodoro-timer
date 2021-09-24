import React from "react";
import { minutesToDuration } from "./utils/duration";

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
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        {/* display the current focus session duration */}
        <span className="input-group-text" data-testid="duration-focus">
          {title}: {minutesToDuration(value)}
        </span>

        <div className="input-group-append">
          {/* decrease focus duration and disable during a focus or break session */}
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
      </div>
    </div>
  );
}

export default Timer;
