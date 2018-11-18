import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import CircularProgressbar from "react-circular-progressbar";

function LayeredProgressbar(props) {
  const { renderOverlays, ...otherProps } = props;
  const overlayStyles = {
    position: "absolute",
    //    backgroundColor: "#2f2e3d",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  const overlays = props.renderOverlays();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ position: "absolute" }}>
        <CircularProgressbar {...otherProps} />
      </div>
      {overlays.map((overlay, index) => (
        <div style={overlayStyles} key={index}>
          {overlay}
        </div>
      ))}
    </div>
  );
}

function RadialSeparator(props) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "5px",
        height: "100%",
        transform: `rotate(${props.degrees}deg)`
      }}
    />
  );
}

function getRadialSeparators(numSeparators) {
  const degrees = 360 / numSeparators;
  return _.range(numSeparators / 2).map(index => (
    <RadialSeparator degrees={index * degrees} />
  ));
}

function SegmentedProgressbar(props) {
  const { color1, color2, percentage, fontsize } = props;

  return (
    <LayeredProgressbar
      percentage={percentage}
      strokeWidth={25}
      counterClockwise
      styles={{
        trail: { 
          stroke: {color1}
        },
        path: {
          stroke: {color2},
          strokeLinecap: "butt"
        }
      }}
      renderOverlays={() =>
        getRadialSeparators(40).concat(
          <div style={{ fontSize: {fontsize}, color: "#2f2e3d" }}>
            {percentage}%
          </div>
        )
      }
    />
  );
}

export default SegmentedProgressbar;
