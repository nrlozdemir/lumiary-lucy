/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from "react";
import Card from "Components/Card";
import VerticalPercentage from "Components/Charts/VerticalPercantage";

import style from "./../../styles.scss";
import { videoTabsDataCompare } from "./../../options";

const CompareVideoTabs = ({ location }) => {
	return videoTabsDataCompare.map(video => (
		<React.Fragment key={video.url}>
			<div className="col-12">
				<Card
					title={video.tabName}
					headerIconRight="qf-iconRight-Arrow"
					customHeaderClass="bg-tealish border-bt-dark headerVideoTabs"
					customBodyClass="bg-charcoal-grey pb-35"
					link={location + "/" + video.url}
				>
					<div>
						<div className="grid-container border-bt-tealish">
							<div className="col-6">
								<p className={style.compareVideoHeadings}>{video.headingOne}</p>
							</div>
							<div className="col-6">
								<p className={style.compareVideoHeadings}>{video.headingTwo}</p>
							</div>
						</div>
					</div>
					<div className={style.compareArea}>
						<div className="col-6">
							<VerticalPercentage
								labels={["0%", "25%", "50%", "75%", "100%"]}
								data={video.dataOne}
								height="43"
								float="left"
							/>
							<p className={style.percentageLegend}>
								<span className={style.roundWhite} />
								{video.legendOne}
							</p>
						</div>
						<div className="col-6">
							<VerticalPercentage
								labels={["0%", "25%", "50%", "75%", "100%"]}
								data={video.dataTwo}
								height="43"
								float="right"
							/>
							<p className={style.percentageLegend + " text-right"}>
								<span className={style.roundWhite} />
								{video.legendTwo}
							</p>
						</div>
						<div className="col-12">
							<p className={style.differenceText}>{video.difference}</p>
						</div>
						<div
							className={style.compareAvarageArea}
							style={{ right: video.right, left: video.left }}
						>
							<p>{video.avarageTitle}</p>
						</div>
					</div>
				</Card>
			</div>
		</React.Fragment>
	));
};

export default CompareVideoTabs;
