"use strict";

import React from "react";
import style from "./style.scss";

import Slider from "react-slick";

class RankingsList extends React.Component {
	render() {

		const slides = {
			'facebook': [
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
			],
			'instagram': [
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
			],
			'snapchat': [
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
			],
			'youtube': [
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
			],
			'twitter': [
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
			],
			'pinterest': [
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
			]
		};
		const slideKeys = Object.keys(slides);
		var sectionSlide;

		return (
			<React.Fragment>
				<div className={style.container}>

					<div className={style.header}>Platform Rankings</div><br />

						<div className={style.rankList}>
							<Slider
								speed={90}
								infinite={ true }
								variableWidth={ true }
								arrows={ false }
								dots={ false }
								draggable={ false }
								centerMode={ true }
							>
								{slides.facebook.map(slide => (
									<div className={style.sliderCell}>
										<img src={slide.src} alt={slide.id} />
									</div>
								))}
							</Slider>
						</div>
						<div className={style.info_fb}>
							facebook
						</div>


						<div className={style.rankList}>
							<Slider
								speed={90}
								infinite={ true }
								variableWidth={ true }
								arrows={ false }
								dots={ false }
								draggable={ false }
								centerMode={ true }
							>
								{slides.twitter.map(slide => (
									<div className={style.sliderCell}>
										<img src={slide.src} alt={slide.id} />
									</div>
								))}
							</Slider>
						</div>
						<div className={style.info}>
							twitter
						</div>

				</div>

			</React.Fragment>
		);
	}
};

export default RankingsList;
