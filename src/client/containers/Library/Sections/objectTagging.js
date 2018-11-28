import React from "react";
import Card from "./../../../components/Card";
import TimeLineChart from "./../../../components/Charts/TimeLineChart";
import VerticalSlider from "./../../../components/Sliders/VerticalSlider";

const ObjectTagging = () => (
	<Card
		title="Color Tone"
		customHeaderClass="bg-dark-three"
		customBodyClass="bg-dark-three box-shadow-black-1 color-white"
	>
		<div className="col-12 p-25">
			<TimeLineChart backgroundColor="#2f2d3d" color="#21bcd5" />
			<div style={{ width: "21%", float: "left" }}>
				<VerticalSlider />
			</div>
			<div style={{ width: "20%", float: "left" }}>
				<VerticalSlider />
			</div>
			<div style={{ width: "26%", float: "left" }}>
				<VerticalSlider />
			</div>
			<div style={{ width: "30%", float: "left" }}>
				<VerticalSlider />
			</div>
		</div>
	</Card>
);

export default ObjectTagging;
