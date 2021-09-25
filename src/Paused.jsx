import React from "react";

function Paused({ isTimerRunning }) {
  if (isTimerRunning) {
    return null;
  } else {
    return (
      <div className="row mb-2 d-block" id="paused">
        <div className="col">
          <h3>PAUSED</h3>
        </div>
      </div>
    );
  }
}
export default Paused;
