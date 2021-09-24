import React from "react";
import { minutesToDuration } from "./utils/duration";

function BreakDuration({ state, onChange, breakDuration }) {
  return (
    <div className="input-group input-group-lg mb-2 justify-content-center">
      {/* display the current break session duration */}
      <span
        className="input-group-text bg-grey btn-outline-dark rounded-3"
        data-testid="duration-focus"
      >
        {`Break Duration: ${minutesToDuration(breakDuration)}`}
      </span>

      {/* increase focus duration and disable during a focus or break session */}
      <div className="input-group-append align-self-center">
        <button
          type="button"
          className="btn btn-outline-danger text-danger shadow-none"
          id="timerButton"
          data-testid="decrease-break"
          onClick={() =>
            onChange((prevValue) =>
              prevValue - state.breakChangeInterval >= state.breakLowerLimit
                ? prevValue - state.breakChangeInterval
                : prevValue
            )
          }
        >
          <span className="oi oi-minus my-2" />
        </button>

        <button
          type="button"
          className="btn btn-outline-success text-success shadow-none"
          id="timerButton"
          data-testid="increase-break"
          onClick={() =>
            onChange((prevValue) =>
              prevValue + state.breakChangeInterval <= state.breakUpperLimit
                ? prevValue + state.breakChangeInterval
                : prevValue
            )
          }
        >
          <span className="oi oi-plus my-2" />
        </button>
      </div>
    </div>
  );
}

export default BreakDuration;
