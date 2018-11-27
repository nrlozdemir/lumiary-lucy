import React, { Component } from "react";
import Slider from "react-slick";

import style from "./style.scss";

export default class VerticalSlider extends Component {
	render() {
		const SampleNextArrow = props => {
			const { className, style, onClick } = props;
			return (
				<div
					className={className}
					style={{ ...style, display: "block", background: "red" }}
					onClick={onClick}
				>
					!33
				</div>
			);
		};

		const SamplePrevArrow = props => {
			const { className, style, onClick } = props;
			return (
				<div
					className={className}
					style={{ ...style, display: "block", background: "green" }}
					onClick={onClick}
				/>
			);
		};
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			vertical: true,
			verticalSwiping: true,
			swipeToSlide: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		return (
			<div>
				<h2>176 Objects Tagged</h2>
				<Slider {...settings}>
					<div className={style.word}>
						<h3>Dog</h3>
					</div>
					<div className={style.word}>
						<h3>Cat</h3>
					</div>
					<div className={style.word}>
						<h3>Basketball</h3>
					</div>
					<div className={style.word}>
						<h3>Cup</h3>
					</div>
					<div className={style.word}>
						<h3>Coffee</h3>
					</div>
					<div className={style.word}>
						<h3>Mobile Phone</h3>
					</div>
				</Slider>
			</div>
		);
	}
}
