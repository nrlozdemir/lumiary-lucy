import React from "react";
import { render } from "react-dom";
import _ from "lodash";
import CircularProgressbar from "react-circular-progressbar";
import style from "./style.scss";

function LayeredProgressbar(props) {
  const { renderOverlays, ...otherProps } = props;
  const overlayStyles = {
    position: "absolute",
    height: "76%",
    width: "76%",
    margin: "12%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  const overlays = props.renderOverlays();
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute" }}>
        <CircularProgressbar 
          className={style.inverted}
          background
          backgroundPadding={2}
          {...otherProps} />
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
        backgroundColor: "#21798b",
        width: "2px",
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
  const { color1, color2, percentage, fontsize, ...otherProps } = props;

  return (
    <LayeredProgressbar
      percentage={percentage}
      strokeWidth={25}
      counterClockwise
      renderOverlays={() =>
        getRadialSeparators(40).concat(
          <div className={style.circularBells} style={{ fontSize: {fontsize}, color: "#fff" }}>
            {percentage}%
          </div>
        )
      }
      {...otherProps}
    />
  );
}

export default SegmentedProgressbar;
