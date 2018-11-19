import React from "react";
import CircularProgressBar from "react-circular-progressbar";

function StyledProgressbar(props) {
  return (
    <CircularProgressBar
      percentage={props.percentage}
      text={props.text}
      strokeWidth={5}
      styles={{
        root: {},
        path: {
          stroke: "#21bcd5",
          strokeLinecap: "butt",
          transition: "stroke-dashoffset 0.5s ease 0s"
        },
        trail: {
          stroke: "#2f2e3d"
        },
        text: {
          fill: "#f88",
          fontSize: "30px"
        }
      }}
    />
  );
}
export default StyledProgressbar;
