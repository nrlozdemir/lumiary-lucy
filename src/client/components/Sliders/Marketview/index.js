import React from 'react';
import Slider from 'react-slick';
import style from './style.scss';
import { socialIconSelector } from 'Utils/';

const MarketViewSlider = (props) => {

	const NextArrow = props => {
		const { className, style, onClick } = props;
		if (props.currentSlide + 4 >= props.slideCount) {
			return null;
		}
		return <div className={className} onClick={onClick} />;
	};

	const PrevArrow = props => {
		const { className, style, onClick } = props;
		if (props.currentSlide == 0) {
			return null;
		}
		return <div className={className} onClick={onClick} />;
	};

	const settings = {
		className: 'marketViewSlickSlider',
		infinite: false,
		slidesToShow: 3,
		speed: 0,
		centerMode: true,
		centerPadding: '0',
		dots: true,
		dotsClass: 'slick-dots slick-thumb',
		arrows: true,
		variableWidth: true,
		variableHeight: true,
		swipeToSlide: false,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		afterChange: currentSlide => props.changeVideo(props.items[currentSlide]),
		customPaging: imgIndex => {
			if (imgIndex > props.items.length - 1) {
				return <div />;
			}
			return (
				<a>
					<img src={props.items[imgIndex].image} />
					<p>
						<span className="icon">
							<span className={socialIconSelector(props.items[imgIndex].socialMedia)} />
						</span>
						{props.items[imgIndex].title}
					</p>
				</a>
			);
		}
	};

	return (
		<div className={style.section}>
        <Slider {...settings}>
          {props.items.map((item, i) => (
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
          <div />
          <div />
          <div />
        </Slider>
      </div>
	);
};

export default MarketViewSlider;
