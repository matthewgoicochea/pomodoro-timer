import React from "react";

function ProgressBar({ barWidth, ariaValue }) {
  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress d-none">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={ariaValue} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${barWidth}%` }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
