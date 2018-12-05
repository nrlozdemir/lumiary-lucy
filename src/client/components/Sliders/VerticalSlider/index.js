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
					style={{
						margin: "0 auto",
						position: "relative",
						bottom: 0,
						marginTop: 5,
						marginBottom: 5,

						transform: "rotate(90deg)",
						left: 0
					}}
					onClick={onClick}


					
				/>
			);
		};

		const SamplePrevArrow = props => {
			const { className, style, onClick } = props;
			return (
				<div
					className={className}
					style={{
						margin: "0 auto",
						marginTop: 5,
						marginBottom: 5,
						position: "relative",
						top: 0,
						left: 0,
						transform: "rotate(90deg)"
					}}
					onClick={onClick}
				/>
			);
		};
		const settings = {
			dots: false,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			verticalSwiping: true,
			swipeToSlide: true,
			nextArrow: <SampleNextArrow className={style.arrowNext} />,
			prevArrow: <SamplePrevArrow className={style.prev} />
		};
		return (
			<div className={style.sliderWrapper}>
				<div className={style.word}>
					<h2>176 Objects Tagged</h2>
				</div>
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
