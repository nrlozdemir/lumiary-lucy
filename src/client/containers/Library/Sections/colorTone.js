import React from "react";
import Card from "./../../../components/Card";
import TimeLineChart from "./../../../components/Charts/TimeLineChart";

const ColorTone = () => (
	<Card
		title="Color Tone"
		customHeaderClass="bg-dark-three"
		customBodyClass="bg-dark-three box-shadow-black-1 color-white"
	>
		<div className="col-12 p-25">
			<TimeLineChart isGradient color="#fff" datas={[20, 30, 50]} />
		</div>
	</Card>
);

export default ColorTone;
