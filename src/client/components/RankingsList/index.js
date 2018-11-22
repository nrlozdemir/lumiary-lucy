"use strict";

import React from "react";

import Slider from "react-slick";
import {FaFacebookSquare, FaTwitterSquare, FaInstagram, FaSnapchatGhost, FaYoutube, FaTwitter, FaPinterest} from 'react-icons/fa';

import style from "./style.scss";

class RankingsList extends React.Component {
	render() {

		const slides = [
			{id: 'facebook', data: [
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=234624"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=32572"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=54834"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=69836"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=24672"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=46383"
				}
			]},
			{id:'instagram', data:[
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=72354"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=6834"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=344"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=4683"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=6936"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=79563"
				}
			]},
			{id:'snapchat', data:[
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=3434"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=548245"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=2345"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=35726"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=452"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=68"
				}
			]},
			{id:'youtube', data:[
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=579475"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=2452"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=896"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=457"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=4572"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=45783"
				}
			]},
			{id:'twitter', data:[
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=435863"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=234"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=9097"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=56856"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=672"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=897"
				}
			]},
			{id:'pinterest', data:[
				{
					id: 1,
					src: "https://picsum.photos/135/135?id=245"
				},
				{
					id: 2,
					src: "https://picsum.photos/135/135?id=7956"
				},
				{
					id: 3,
					src: "https://picsum.photos/135/135?id=689"
				},
				{
					id: 4,
					src: "https://picsum.photos/135/135?id=579"
				},
				{
					id: 5,
					src: "https://picsum.photos/135/135?id=58968"
				},
				{
					id: 6,
					src: "https://picsum.photos/135/135?id=789"
				}
			]}
		];

		const renderIcon = function(icon){
			switch (icon) {
				case 'facebook': 	return <FaFacebookSquare />;
				case 'instagram': 	return <FaInstagram />;
				case 'snapchat': 	return <FaSnapchatGhost />;
				case 'youtube': 	return <FaYoutube />;
				case 'twitter': 	return <FaTwitterSquare />;
				case 'pinterest': 	return <FaPinterest />;
			}
		};
		const iconos = [];
		slides.map((platform_item, platform_index) => {
			iconos[platform_index] = renderIcon(Object.values(platform_item.id));
		});
		console.dir(iconos);

		const settings = {
			arrows: false,
			autoplay: true,
			dots: true,
//			dotsClass: 'rankingsSliderDots',
			autoplaySpeed: 3000,
			pauseOnHover: true,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			draggable: true
		};
		return (
			<React.Fragment>

				<h2 className={style.rankingsHeader}>Platform Rankings</h2>
				<br />
				<br />

					{slides.map((platform_item, platform_index) => (
						<React.Fragment key={platform_index}>
							<div className={style.rankList}>
								<Slider ref={slider => (this.slider = slider)} {...settings}>
									{Object.values(platform_item.data).map((slide_item, slide_index) => (
										<div className={style.sliderCell}>
											<img src={slide_item.src} alt={slide_item.id} />
										</div>
									))}
								</Slider>
							    <div className={style.infoBlock}>
								    <div className={style.iconCircle}>
									    <FaFacebookSquare />
								    	{iconos[Object.values(platform_item.id)]}
									</div>
								</div>
							</div>
						</React.Fragment>
					))}
			</React.Fragment>
		);
	}
};

export default RankingsList;
