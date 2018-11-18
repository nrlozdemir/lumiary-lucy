import React from "react";
import TabShow from "./Views/tabShow";
// Sections
import VideoTabs from "./Sections/videoTabs";
import ColorTone from "./Sections/colorTone";
import AgeRangeAndGender from "./Sections/ageRangeAndGender";

import fpsIcon from "./../../assets/videoTabsIcons/fps.png";
import durationIcon from "./../../assets/videoTabsIcons/duration.png";
import scenesIcon from "./../../assets/videoTabsIcons/scenes.png";
import aspectRatioIcon from "./../../assets/videoTabsIcons/aspectRatioIcon.png";
import numberOfFramesIcon from "./../../assets/videoTabsIcons/numberoframes.png";

// Styles
import { pieData, lineData } from "./options";

export default function(location, routeParams, pathname) {
	switch (location) {
		case "frames-per-second":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Frame Per Second"
					icon={fpsIcon}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					isGenerateBox
					consequent="24 FPS (Film Style)"
					littleConsequent="24"
				/>
			);
		case "duration":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Duration"
					icon={durationIcon}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="Long Form (3-5min)"
					littleConsequent="Long Form"
				/>
			);
		case "aspect-ratio":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Aspect Ratio"
					icon={aspectRatioIcon}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="16:9 (Widescreen)"
				/>
			);
		case "number-of-frames":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Number Of Frames"
					icon={numberOfFramesIcon}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="73829 frames in this video"
					littleConsequent="Condensced (10:1 Frames to Time Ratio)"
				/>
			);
		case "scenes":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Scenes"
					icon={scenesIcon}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="3-4 Scenes"
				/>
			);
		default:
			return (
				<div>
					<div className="col-12 mt-25">
						<VideoTabs location={pathname} />
					</div>
					<div className="col-12 mt-25">
						<div className="containerMargin">
							<ColorTone />
						</div>
					</div>
					<div className="col-12 mt-25 mb-25">
						<div className="containerMargin">
							<AgeRangeAndGender />
						</div>
					</div>
				</div>
			);
	}
}
