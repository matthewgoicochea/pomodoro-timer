import React from "react";
import { minutesToDuration } from "./utils/duration";

function FocusDuration({ state, onChange, focusDuration }) {
  return (
    <div className="input-group input-group-lg mb-2">
      {/* display the current focus session duration */}
      <span className="input-group-text" data-testid="duration-focus">
        {`Focus Duration: ${minutesToDuration(focusDuration)}`}
      </span>

      {/* decrease focus duration and disable during a focus or break session */}
      <div className="input-group-append align-self-center">
        <button
          type="button"
          className="btn btn-secondary"
          id="timerButton"
          data-testid="decrease-focus"
          onClick={() =>
            onChange((prevValue) =>
              prevValue - state.focusChangeInterval >= state.focusLowerLimit
                ? prevValue - state.focusChangeInterval
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
          data-testid="increase-focus"
          onClick={() =>
            onChange((prevValue) =>
              prevValue + state.focusChangeInterval <= state.focusUpperLimit
                ? prevValue + state.focusChangeInterval
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

export default FocusDuration;
