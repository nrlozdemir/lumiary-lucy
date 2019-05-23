import React from 'react'
import classnames from 'classnames'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import style from './style.scss'
import { socialIconSelector } from 'Utils/'
import Swiper from 'react-id-swiper'
import SwiperJS from 'swiper/dist/js/swiper.js'
import RightArrowCircleFlat from 'Components/Icons/RightArrowCircleFlat'
import LeftArrowCircleFlat from 'Components/Icons/LeftArrowCircleFlat'
import PropTypes from 'prop-types';

const propTypes = {};
const defaultProps = {};

export default class HorizontalSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}



  settings = {
    modules: [SwiperJS.Pagination],
    shouldSwiperUpdate: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullet',
      clickable: true,
    },
    slidesPerView: 'auto',
    spaceBetween: 40,
    centeredSlides: true,
    speed: 300,
    autoplay: false,
    keyboard: false,
    slideToClickedSlide: true
  }

	render() {
		return (
			<React.Fragment>
				<Swiper ref={(node) => node && (this.refSlider = node.swiper)}>
        {this.props.children}
        </Swiper>
			</React.Fragment>
		);
	}
}

HorizontalSlider.propTypes = propTypes;
HorizontalSlider.defaultProps = defaultProps;
