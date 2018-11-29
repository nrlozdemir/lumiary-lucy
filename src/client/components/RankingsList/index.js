"use strict";

import React from "react";

import style from "./style.scss";
import RankingSlider from "./rankingSlider";

class RankingsList extends React.Component {
	render() {
		const slides = [
			{
				id: "facebook",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			},
			{
				id: "instagram",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			},
			{
				id: "snapchat",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			},
			{
				id: "youtube",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			},
			{
				id: "twitter",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			},
			{
				id: "pinterest",
				data: [
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
						id: "lumascape4",
						video: "//media.quickframe.com/video/video/13433.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
						id: "lumascape12",
						video: "//media.quickframe.com/video/video/15991.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
						id: "lumascape1",
						video: "//media.quickframe.com/video/video/7485.mp4"
					},
					{
						poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
						id: "kumascape3",
						video: "//media.quickframe.com/video/video/6324.mp4"
					}
				]
			}
		];

		return (
			<React.Fragment>
				<h2 className={style.rankingsHeader}>Platform Rankings</h2>
				<br />
				{slides.map(platformItem => (
					<RankingSlider platformItem={platformItem} key={platformItem.id} />
				))}
			</React.Fragment>
		);
	}
}

export default RankingsList;
