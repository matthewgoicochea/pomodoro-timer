import React from "react";
import { minutesToDuration } from "./utils/duration";

function FocusDuration({ state, onChange, focusDuration }) {
  return (
    <div className="input-group input-group-lg mb-2 justify-content-center">
      {/* display the current focus duration */}
      <div
        className="input-group-text bg-grey btn-outline-dark rounded-3 mx-2 my-2"
        data-testid="duration-focus"
      >
        {`Focus Duration: ${minutesToDuration(focusDuration)}`}
      </div>

      {/* decrease focus duration and disable during a focus or break session */}
      <div className="input-group-append align-self-center">
        <button
          type="button"
          className="btn btn-outline-danger text-danger shadow-none"
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
          <span className="oi oi-minus my-2" />
        </button>

        <button
          type="button"
          className="btn btn-outline-success text-success shadow-none"
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
          <span className="oi oi-plus my-2" />
        </button>
      </div>
    </div>
  );
}

export default FocusDuration;
