import React from "react";
import TabShow from "../Library/Views/tabShow";

// Sections
import Tabs from "./views/tabs";
// Styles
import { pieData, lineData } from "../Library/options";

export default function(location, routeParams, useCase) {
	switch (location) {
		case "frames-per-second":
			return (
				<TabShow
					title="Frame Per Second"
					icon={require("./../../assets/videoTabsIcons/fps.png")}
					iconTwo={require("./../../assets/videoTabsIcons/fps.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					isGenerateBox
					consequent="24 FPS (Film Style)"
					littleConsequent="24"
					removeHeader
					compareMode={useCase ? true : false}
				/>
			);
		case "duration":
			return (
				<TabShow
					title="Duration"
					icon={require("./../../assets/videoTabsIcons/duration.png")}
					iconTwo={require("./../../assets/videoTabsIcons/durationTwo.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="Long Form (3-5min)"
					littleConsequent="Long Form"
					removeHeader
					compareMode={useCase ? true : false}
				/>
			);
		case "aspect-ratio":
			return (
				<TabShow
					title="Aspect Ratio"
					icon={require("./../../assets/videoTabsIcons/aspectRatioIcon.png")}
					iconTwo={require("./../../assets/videoTabsIcons/aspectRatioIconTwo.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="16:9 (Widescreen)"
					removeHeader
					compareMode={useCase ? true : false}
				/>
			);
		case "number-of-frames":
			return (
				<TabShow
					title="Number Of Frames"
					icon={require("./../../assets/videoTabsIcons/numberoframes.png")}
					iconTwo={require("./../../assets/videoTabsIcons/numberOfFramesTwo.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="73829 frames in this video"
					littleConsequent="Condensced (10:1 Frames to Time Ratio)"
					removeHeader
					compareMode={useCase ? true : false}
				/>
			);
		case "scenes":
			return (
				<TabShow
					title="Scenes"
					icon={require("./../../assets/videoTabsIcons/scenes.png")}
					iconTwo={require("./../../assets/videoTabsIcons/scenesTwo.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="3-4 Scenes"
					removeHeader
					compareMode={useCase ? true : false}
				/>
			);
		case "color-tone":
			return (
				<TabShow
					title="Color Tone"
					icon={require("./../../assets/videoTabsIcons/colorToneOne.png")}
					iconTwo={require("./../../assets/videoTabsIcons/colorToneTwo.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="Dull - Cool"
					littleConsequent="Dull-Cool Vibrant-Cool"
					removeHeader
					compareMode={useCase}
				/>
			);
		default:
			return (
				<div>
					<div className="col-12 mt-25">
						<Tabs />
					</div>
				</div>
			);
	}
}
