import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "Reducers/home";
import { Link } from "react-router";
import { actions as marketActions } from "Reducers/marketview";
import SubNav from "../views/subNav";
import cx from "classnames";
import style from "../styles.scss";
import LineChart from "./../../../components/Charts/LineChart";
import Card from "../../../components/Card";
import VideoTabs from "../../Library/Sections/videoTabs";
import ColorTone from "../../Library/Sections/colorTone";
import AgeRangeAndGender from "../../Library/Sections/ageRangeAndGender";
import BarChart from "Components/Charts/BarChart";
import VideoSlider from "Components/Sliders/VideoSlider";
import Tabs from "./../views/tabs";
import switchTabs from "../switchTab";
import { videoTabsDataBottom } from "../../Library/options";

// import PropTypes from 'prop-types'

const videoList = [
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
	}
];

class UseCase extends Component {
	render() {
		const yLabels = {
			0: "1-2 Scenes",
			2: "3-5 Scenes",
			4: "6-10 Scenes",
			6: "10-20 Scenes"
		};
		console.log(this.props);

		return (
			<div className={cx(style.marketView, style.platform, style.competitor)}>
				<SubNav />

				<div className={style.container}>
					<div className="col-12 mt-10 pb-10">
						<div className="mb-25">
							<LineChart
								height="40px"
								options={{
									legend: {
										display: false
									},
									scales: {
										xAxes: [
											{
												display: false
											}
										],
										yAxes: [
											{
												ticks: {
													callback: function(value, index, values) {
														// for a value (tick) equals to 8
														return yLabels[value];
														// 'junior-dev' will be returned instead and displayed on your chart
													}
												}
											}
										]
									}
								}}
							/>
						</div>

						<div className="col-1">
							<div className={style.iconWrapper}>
								<span className={"qf-iconFacebook " + style.icon} />
							</div>
							<div className={style.iconWrapper}>
								<span className={"qf-iconInstagram " + style.icon} />
							</div>
						</div>
						<div className="col-11 mt-10 pb-10">
							<div className={style.upContainer + " mb-25"}>
								<div className="col-6">
									<div className="col-12">
										<VideoSlider items={videoList} />
									</div>
									<div className="col-12 grid-collapse mt-25">
										<div className="col-6">
											<h2 className={style.header}>Meet The Puppet</h2>
										</div>
										<div className="col-6">
											<div className="float-right">
												<span
													className={"qf-iconFacebook " + style.activeIcon}
												/>
												<span
													className={"qf-iconInstagram " + style.activeIcon}
												/>
												<span
													className={"qf-iconSnapchat " + style.deactiveIcon}
												/>
												<span
													className={"qf-iconTwitter " + style.deactiveIcon}
												/>
												<span
													className={"qf-iconYotube " + style.deactiveIcon}
												/>
												<span
													className={"qf-iconPinterest " + style.deactiveIcon}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="col-6">
									<div className="col-12">
										<VideoSlider items={videoList} />
									</div>
									<div className="col-12 grid-collapse mt-25">
										<div className="col-6">
											<h2 className={style.header}>The QB advetures</h2>
										</div>
										<div className="col-6">
											<div className="float-right">
												<span
													className={"qf-iconFacebook " + style.activeIcon}
												/>
												<span
													className={"qf-iconInstagram " + style.activeIcon}
												/>
												<span
													className={"qf-iconSnapchat " + style.deactiveIcon}
												/>
												<span
													className={"qf-iconTwitter " + style.activeIcon}
												/>
												<span
													className={"qf-iconYotube " + style.deactiveIcon}
												/>
												<span
													className={"qf-iconPinterest " + style.activeIcon}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<Card
									title="Lumiere Data"
									customHeaderClass="bg-charcoal-grey border-bt-dark color-white"
									customBodyClass="bg-charcoal-grey color-white"
								>
									<div className="grid-collapse">
										<div className="col-12 mt-25">
											<div className={style.tabWrapper}>
												<Link className={style.tab} to="/marketview/usecase">
													All
												</Link>
												{videoTabsDataBottom.map(link => (
													<Link
														key={link.url}
														to={"/marketview/usecase/" + link.url}
														className={style.tab}
													>
														{link.tabName}
													</Link>
												))}
											</div>
											<br />
											{switchTabs(
												this.props.params.tab,
												this.props.routeParams.id
											)}
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		app: state.app
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(Object.assign({}, actions, marketActions), dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UseCase);
