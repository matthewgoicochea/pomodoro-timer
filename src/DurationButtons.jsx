import React from "react";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
function DurationButtons({
  state,
  focusDuration,
  breakDuration,
  setFocusDuration,
  setBreakDuration,
}) {
  return (
    <div className="row mb-4">
      <div className="col">
        <FocusDuration
          state={state}
          focusDuration={focusDuration}
          onChange={setFocusDuration}
        />
      </div>
      <div className="col">
        <BreakDuration
          state={state}
          breakDuration={breakDuration}
          onChange={setBreakDuration}
        />
      </div>
    </div>
  );
}

export default DurationButtons;
