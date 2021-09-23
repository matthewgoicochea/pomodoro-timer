import React from "react";
import { minutesToDuration } from "../utils/duration";

function SessionTitle({ isFocus, focusDuration, breakDuration }) {
  if (isFocus) {
    return `Focusing for ${minutesToDuration(focusDuration)} minutes`;
  } else {
    return `On Break for ${minutesToDuration(breakDuration)} minutes`;
  }
}

export default SessionTitle;
