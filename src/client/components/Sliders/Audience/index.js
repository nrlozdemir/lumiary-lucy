import React from 'react';
import Slider from 'react-slick';
import style from './style.scss';
import { socialIconSelector } from 'Utils/';

const NextArrow = (props) => {
	const { className, style, onClick } = props;
	if (props.currentSlide + 4 >= props.slideCount) {
		return null;
	}
	return <div className={className} onClick={onClick} />;
};

const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	if (props.currentSlide == 0) {
		return null;
	}
	return <div className={className} onClick={onClick} />;
};

class AudienceSlider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { items } = props;

		const settings = {
			className: 'audienceSlickSlider',
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			speed: 300,
			centerMode: true,
			centerPadding: '0',
			dots: false,
			variableWidth: true,
			variableHeight: true,
			swipeToSlide: false,
			asNavFor: this.thumb,
			afterChange: currentSlide => props.changeVideo(items[currentSlide])
		};

		const thumbSettings = {
			className: 'audienceThumbSlickSlider',
			infinite: false,
			slidesToShow: 9,
			slidesToScroll: 1,
			arrows: false,
			speed: 300,
			centerMode: true,
			centerPadding: '0',
			variableWidth: true,
			variableHeight: true,
			swipeToSlide: false,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />,
			asNavFor: this.slider,
			afterChange: currentSlide => props.changeVideo(items[currentSlide])
		};

		return (
			<div className={style.section}>
				<Slider ref={slider => (this.slider = slider)} {...settings}>
					{items.map((item, i) => (
						<div className="item" key={i}>
							<img src={item.image} />
							<p>
								<span className="icon">
									<span className={socialIconSelector(item.socialMedia)} />
								</span>
								{item.title}
								<span className="secondTitle">{item.secondTitle}</span>
							</p>
						</div>
					))}
				</Slider>
				<Slider ref={thumb => (this.thumb = thumb)} {...thumbSettings}>
					{items.map((item, i) => (
						<div className="item" key={i}>
							{item.title}
						</div>
					))}
				</Slider>
			</div>
		);
	}
};

export default AudienceSlider;
