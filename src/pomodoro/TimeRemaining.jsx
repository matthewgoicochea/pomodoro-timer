import React from "react";
import { secondsToDuration } from "../utils/duration";

function TimeRemaining({ isFocus, focusCount, breakCount }) {
  if (isFocus) {
    return secondsToDuration(focusCount);
  } else {
    return secondsToDuration(breakCount);
  }
}

export default TimeRemaining;
