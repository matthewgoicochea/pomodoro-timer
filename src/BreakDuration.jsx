import React from "react";
import { minutesToDuration } from "./utils/duration";

function BreakDuration({ state, onChange, breakDuration }) {
  return (
    <div className="input-group input-group-lg mb-2">
      {/* display the current break session duration */}
      <span className="input-group-text" data-testid="duration-focus">
        {`Break Duration: ${minutesToDuration(breakDuration)}`}
      </span>

      {/* increase focus duration and disable during a focus or break session */}
      <div className="input-group-append align-self-center">
        <button
          type="button"
          className="btn btn-secondary"
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
          <span className="oi oi-minus" />
        </button>

        <button
          type="button"
          className="btn btn-secondary"
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
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default BreakDuration;
