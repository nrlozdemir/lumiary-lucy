"use strict";

import React from "react";
import style from "./style.scss";

class RankingsList extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className={style.container}>
					<div className={style.header}>Platform Rankings</div>
					<div className={style.list}>

					</div>
				</div>
			</React.Fragment>
		);
	}
};

export default RankingsList;
