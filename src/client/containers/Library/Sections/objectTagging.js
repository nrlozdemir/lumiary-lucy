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
			<TimeLineChart backgroundColor="#2f2d3d" />
			<VerticalSlider />
		</div>
	</Card>
);

export default ObjectTagging;
