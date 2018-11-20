import React from "react";
import TabShow from "./Views/tabShow";
// Sections
import VideoTabs from "./Sections/videoTabs";
import ColorTone from "./Sections/colorTone";
import AgeRangeAndGender from "./Sections/ageRangeAndGender";

// Styles
import { pieData, lineData } from "./options";
import CompareVideoTabs from "./Sections/Compare/compareVideoTabs";

export default function(location, routeParams, pathname, compareMode) {
	switch (location) {
		case "frames-per-second":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Frame Per Second"
					icon={require("./../../assets/videoTabsIcons/fps.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					isGenerateBox
					consequent="24 FPS (Film Style)"
					littleConsequent="24"
					compareMode={compareMode}
				/>
			);
		case "duration":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Duration"
					icon={require("./../../assets/videoTabsIcons/duration.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="Long Form (3-5min)"
					littleConsequent="Long Form"
					compareMode={compareMode}
				/>
			);
		case "aspect-ratio":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Aspect Ratio"
					icon={require("./../../assets/videoTabsIcons/aspectRatioIcon.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="16:9 (Widescreen)"
					compareMode={compareMode}
				/>
			);
		case "number-of-frames":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Number Of Frames"
					icon={require("./../../assets/videoTabsIcons/numberoframes.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="73829 frames in this video"
					littleConsequent="Condensced (10:1 Frames to Time Ratio)"
					compareMode={compareMode}
				/>
			);
		case "scenes":
			return (
				<TabShow
					location={`/library/video/${routeParams}`}
					title="Scenes"
					icon={require("./../../assets/videoTabsIcons/scenes.png")}
					pieData={pieData}
					pieTitle="Library Data"
					barData={pieData}
					barTitle="Industry Data"
					lineData={lineData}
					consequent="4 Scenes in total"
					littleConsequent="3-4 Scenes"
					compareMode={compareMode}
				/>
			);
		default:
			return compareMode ? (
				<div className="grid-collapse">
					<CompareVideoTabs location={pathname} />
				</div>
			) : (
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
