import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import style from "./styles.scss";

import Slider from "rc-slider";

const RangeSlider = Slider.Range;

class Range extends Component {
	constructor(props) {
		super(props);
		const { minValue, maxValue } = this.props;
		this.state = {
			value: [minValue, maxValue]
		};
	}

	onSliderChange(value) {
		const {input: {onChange = () => {}}} = this.props;

		this.setState({
			value
		});

		onChange(value);
	}

	render() {
		const { className, input: {onChange}, minValue, maxValue } = this.props;

		const { value } = this.state;

		return (
			<div className="range-slider">
				<RangeSlider
					allowCross={false}
					value={value}
					defaultValue={value}
					handleStyle={[
						{
							width: "32px",
							height: "32px",
							marginTop: "-8px",
							borderColor: "#fff"
						},
						{
							width: "32px",
							height: "32px",
							marginTop: "-8px",
							borderColor: "#fff"
						}
					]}
					trackStyle={[
						{
							height: "16px",
							backgroundColor: "#51adc0"
						}
					]}
					railStyle={{
						height: "16px",
						borderRadius: "8px",
						backgroundColor: "#242b49"
					}}
					onChange={this.onSliderChange.bind(this)}
				/>
				<div className="d-flex align-items-center justify-space-between mt-24 ticks">
					<span>0-15s</span>
					<span>15-30s</span>
					<span>30-60s</span>
					<span>60s+</span>
				</div>
			</div>
		);
	}
}

export default Range;
