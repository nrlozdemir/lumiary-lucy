"use strict";

import React from "react";
import PropTypes from "prop-types";
// Components
import "chartjs-plugin-datalabels";
import Card from "../../components/Card";
import TabBar from "../../components/TabBar";
// Sections
import VideoBrief from "./Sections/videoBrief";
import VideoTabs from "./Sections/videoTabs";
import ColorTone from "./Sections/colorTone";
import AgeRangeAndGender from "./Sections/ageRangeAndGender";
// Styles
import style from "./styles.scss";

class Library extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className={style.main}>
					<div className="col-7">
						<Card removeHeader customBodyClass="bg-charcoal-grey">
							<TabBar
								items={["Single View", "Compare Mode"]}
								selectedTabClassName={style.selectedTabs}
								selectedTabPanelClassName={style.selectedPanel}
								tablistClassName={style.tablList}
							>
								<div>
									<span
										className={style.closeButton}
										onClick={() => this.props.router.push(`/`)}
									>
										X
									</span>
									<div className={style.videoImage}>
										<span className={style.videoIcon + " qf-iconPlay"}>
											<span className="path1" />
											<span className="path2" />
											<span className="path3" />
											<span className="path4" />
											<span className="path5" />
											<span className="path6" />
										</span>
										<img
											style={{ width: "100%" }}
											src="https://picsum.photos/1000/430/?random
							"
										/>
									</div>
								</div>
								<div>
									<span
										className={style.closeButton}
										onClick={() => this.props.router.push(`/`)}
									>
										X
									</span>
									<img
										style={{ width: "100%" }}
										src="https://picsum.photos/1000/430/
							"
									/>
								</div>
							</TabBar>
						</Card>
					</div>
					<div className="col-5 mt-10">
						<VideoBrief />
					</div>
					<div className="col-12 mt-10 pb-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark color-white"
							customBodyClass="bg-charcoal-grey color-white"
						>
							<div className="col-12 mt-25">
								<VideoTabs />
							</div>
							<div className="col-12 mt-25">
								<div className="containerMargin">
									<ColorTone />
								</div>
							</div>
							<div className="col-12 mt-25 mb-25">
								<div className="containerMargin">
									<AgeRangeAndGender />
								</div>
							</div>
						</Card>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = { router: PropTypes.object };

Library.defaultProps = {};

export default Library;
