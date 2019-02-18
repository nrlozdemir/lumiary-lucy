import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

import style from "./style.scss";

import Select from "Components/Form/SelectField";
import Button from "Components/Form/Button";
import SocialCheckBoxes from "Components/Form/SocialCheckBoxes/";
import ColorRadioBoxes from "Components/Form/ColorRadioBoxes/index";
import Range from "Components/Form/Range";

const Sidebar = props => {
	const { reset } = props;
	const sidebarClass = classnames(style.sidebar, {
		[style.sidebarVisible]: props.sidebarVisible
	});
	const brandOptions = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" }
	];
	return (
		<form onSubmit={() => console.log("object")}>
			<div className={sidebarClass}>
				<div className={style.sidebarHeader}>
					<p className={style.text}>
						<span className="float-left color-dark-blue-grey">Filter Videos</span>
						<span className="float-right color-cool-blue" onClick={reset}>
							Reset
						</span>
					</p>
					<div className="clearFix" />
				</div>
				<div className="ph-32 mt-72">
					<div className="w-100 mt-48 d-flex flex-column align-items-start justify-content-center">
						<Select
							id="OrderedBy"
							name="OrderedBy"
							customClass={style.customSidebarInput}
							placeholder="Select One"
							options={brandOptions}
							label="Ordered By"
						/>
					</div>
					<div className="w-100 mt-48">
						<SocialCheckBoxes />
					</div>
					<div className="w-100 d-flex justify-space-between mt-48">
						<div className="w-50 ml-0 pr-8">
							<Select id="AgeRange" name="AgeRange" placeholder="Select One" options={brandOptions} label="Age Range" />
						</div>
						<div className="w-50 ml-0 pl-8">
							<Select id="Gender" name="Gender" placeholder="Select One" options={brandOptions} label="Gender" />
						</div>
					</div>
					<div className="w-100 mt-48">
						<Field id="Duration" name="Duration" component={Range} minValue={0} maxValue={60} />
					</div>
					<div className="w-100 mt-48">
						<ColorRadioBoxes />
					</div>
					<div className="w-100 mt-48">
						<Select
							id="VideoFormat"
							name="VideoFormat"
							placeholder="Select One"
							options={brandOptions}
							label="Video Format"
						/>
					</div>
					<div className="w-100 mt-48">
						<Select
							id="AspectRatio"
							name="AspectRatio"
							placeholder="Select One"
							options={brandOptions}
							label="Aspect Ratio"
						/>
					</div>
					<div className="w-100 mt-48">
						<Select
							id="FramesPerSecond"
							name="FramesPerSecond"
							placeholder="Select One"
							options={brandOptions}
							label="Frames Per Second"
						/>
					</div>
					<div className="w-100 mt-48">
						<Select
							id="Resolution"
							name="Resolution"
							placeholder="Select One"
							options={brandOptions}
							label="Resolution"
						/>
					</div>
					<div className="w-100 mt-48">
						<Select
							id="NumberOfScenes"
							name="NumberOfScenes"
							placeholder="Select One"
							options={brandOptions}
							label="Number of Scenes"
						/>
					</div>
					<div className="w-100 d-flex align-items-center justify-content-center">
						<Button onClick={() => console.log("qwerf")} customClass="mt-48" buttonText="Apply Filters" />
					</div>
					<div className="w-100 d-flex align-items-center justify-content-center">
						<span className={style.cancel} onClick={() => props.setSidebarVisible(false)}>
							Cancel
						</span>
					</div>
				</div>
			</div>
		</form>
	);
};

Sidebar.propTypes = {
	sidebarVisible: PropTypes.bool
};

export default reduxForm({
	form: "sidebar"
})(Sidebar);
