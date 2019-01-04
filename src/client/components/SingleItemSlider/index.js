/**
 *
 * SingleItemSlider
 *
 */

import React from "react";
import classnames from "classnames";
import Slider from "react-slick";
import style from "./style.scss";
// import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */

class SingleItemSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSlideIndex: 0
		};
	}
	render() {
		const settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			beforeChange: (current, next) => this.setState({ currentSlideIndex: next })
		};

		const { currentSlideIndex } = this.state;

		const leftArrow = classnames("qf-iconLeft-Arrow", style.arrowLeft, {
			[style.disable]: currentSlideIndex === 0
		});
		const rightArrow = classnames("qf-iconRight-Arrow", style.arrowRight, {
			[style.disable]: currentSlideIndex + 1 === this.props.slideImages.length
		});

		return (
			<div className={style.sliderClass}>
				<Slider ref={c => (this.slider = c)} {...settings}>
					{this.props.slideImages.map((image, i) => (
						<div key={i}>
							<img src={image.src} className="img-responsive" />
						</div>
					))}
				</Slider>
				<span className={leftArrow} onClick={() => this.slider.slickPrev()} />
				<p className={style.whichSlideText}>
					Shot {currentSlideIndex + 1}/{this.props.slideImages.length}
				</p>
				<span className={rightArrow} onClick={() => this.slider.slickNext()} />
			</div>
		);
	}
}

SingleItemSlider.propTypes = {};

export default SingleItemSlider;
