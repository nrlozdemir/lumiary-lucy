"use strict";

import React from "react";

import style from "./style.scss";
import RankingSlider from "./rankingSlider";
import { viewsVideos } from "../../containers/Library/options";

class RankingsList extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h2 className={style.rankingsHeader}>Platform Rankings</h2>
				<br />
				{viewsVideos[this.props.selectedView].map(platformItem => (
					<RankingSlider platformItem={platformItem} key={platformItem.id} />
				))}
			</React.Fragment>
		);
	}
}

export default RankingsList;
