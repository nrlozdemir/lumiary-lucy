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
		this.state = {
			refSlider: null,
			refThumb: null
		}
	}

	componentDidMount() {
		this.setState({
			refSlider: this.refSlider,
			refThumb: this.refThumb
		});
	}

	render() {
		const { items, changeVideo } = this.props;
		const { refSlider, refThumb } = this.state;

		const settings = {
			className: 'audienceSlickSlider',
			infinite: false,
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			speed: 300,
			dots: false,
			variableWidth: true,
			variableHeight: true,
			swipeToSlide: false,
			focusOnSelect: true,
			afterChange: currentSlide => changeVideo(items[currentSlide]),
			centerMode: true,
			centerPadding: "0",
		};

		const thumbSettings = {
			className: 'audienceThumbSlickSlider',
			infinite: false,
			arrows: true,
			slidesToShow: 9,
			slidesToScroll: 1,
			speed: 300,
			swipeToSlide: true,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />,
			focusOnSelect: true,
			centerMode: true,
			centerPadding: "0",
		};

		return (
			<div className={style.section} >
				<Slider
					asNavFor={refThumb}
					ref={slider => (this.refSlider = slider)}
					{...settings}
				>
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
				<Slider
					asNavFor={refSlider}
					ref={slider => (this.refThumb = slider)}
					{...thumbSettings}
				>
					{items.map((item, i) => (
						<div className="item" key={i}>
							{item.age}
						</div>
					))}
				</Slider>
			</div>
		);
	}
};

export default AudienceSlider;
