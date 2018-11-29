import React from "react";
import style from "./style.scss";

class SegmentedProgressbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: this.canvas
		};
	}
	componentDidMount() {
		var cx = 67;
		var cy = 67;
		var innerRadius = 30;
		var outerRadius = 90;
		const component = this.canvas;
		var ctx = component.getContext("2d");
		ctx.beginPath();
		ctx.arc(67, 67, 60, 0, 2 * Math.PI);
		ctx.fillStyle = "#282333";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(67, 67, 61, 0, 2 * Math.PI);
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 1;
		ctx.stroke();
		for (var value = 0; value <= 750; value += 25) {
			var scaledValue = this.scaleIntoRange(0, 750, 0, 360, value);
			var degrees = scaledValue - 90;
			var shorterLine = (outerRadius - innerRadius) / 2;
			if (this.props.percentage * 10 > value) {
				this.radiantLine(
					cx,
					cy,
					innerRadius,
					outerRadius - shorterLine,
					degrees,
					1.5,
					"#21bcd5"
				);
			} else {
				this.radiantLine(
					cx,
					cy,
					innerRadius,
					outerRadius - shorterLine,
					degrees,
					1.5,
					"#21bcd569"
				);
			}
		}
	}
	radiantLine(
		centerX,
		centerY,
		innerRadius,
		outerRadius,
		degrees,
		linewidth,
		color
	) {
		const component = this.canvas;
		var ctx = component.getContext("2d");
		var radians = (degrees * Math.PI) / 180;
		var innerX = centerX + innerRadius * Math.cos(radians);
		var innerY = centerY + innerRadius * Math.sin(radians);
		var outerX = centerX + outerRadius * Math.cos(radians);
		var outerY = centerY + outerRadius * Math.sin(radians);

		ctx.beginPath();
		ctx.moveTo(innerX, innerY);
		ctx.lineTo(outerX, outerY);
		ctx.strokeStyle = color;
		ctx.lineWidth = linewidth;
		ctx.stroke();
	}

	scaleIntoRange(minActual, maxActual, minRange, maxRange, value) {
		var scaled =
			((maxRange - minRange) * (value - minRange)) / (maxActual - minActual) +
			minRange;
		return scaled;
	}

	render() {
		return (
			<React.Fragment>
				<canvas
					className={style.canvas}
					ref={c => {
						this.canvas = c;
					}}
					width="134"
					height="134"
				/>
				<p className={style.percentage}>{this.props.percentage}%</p>
			</React.Fragment>
		);
	}
}

export default SegmentedProgressbar;
