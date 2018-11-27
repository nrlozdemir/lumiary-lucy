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

class Audince extends Component {
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
							<div className={style.iconWrapperRectangle}>
								<span className={"qf-iconMale " + style.icon} />
								<p className={style.iconText}>Male</p>
							</div>
							<div className={style.iconWrapperRectangle + " " + style.active}>
								<span className={"qf-iconFemale " + style.icon} />
								<p className={style.iconText}>Female</p>
							</div>
							<div className={style.iconWrapperAudience}>
								<p className={style.iconText}>13-18</p>
							</div>
							<div
								className={
									style.iconWrapperAudience + " " + style.iconWrapperActive
								}
							>
								<p className={style.iconText}>18-21</p>
							</div>
							<div className={style.iconWrapperAudience}>
								<p className={style.iconText}>21-28</p>
							</div>
							<div className={style.iconWrapperAudience}>
								<p className={style.iconText}>28-35</p>
							</div>
							<div className={style.iconWrapperAudience}>
								<p className={style.iconText}>35-42</p>
							</div>
							<div className={style.iconWrapperAudience}>
								<p className={style.iconText}>42-65</p>
							</div>
						</div>

						<div className="col-11 mt-10 pb-10">
							<div className={style.upContainer + " mb-25"}>
								<div className="col-6">
									<VideoSlider items={videoList} />
								</div>
								<div className="col-6">
									<div className={style.videoHeader}>
										<h2 className={style.header}>My July’s Faves</h2>
										<div className={style.social}>
											<span className={"qf-iconFacebook " + style.activeIcon} />
											<span
												className={"qf-iconInstagram " + style.activeIcon}
											/>
											<span
												className={"qf-iconSnapchat " + style.deactiveIcon}
											/>
											<span
												className={"qf-iconTwitter " + style.deactiveIcon}
											/>
											<span className={"qf-iconYotube " + style.deactiveIcon} />
											<span
												className={"qf-iconPinterest " + style.deactiveIcon}
											/>
										</div>
									</div>

									<Card
										removeHeader
										customBodyClass={"bg-charcoal-grey pl-25" + style.cardView}
									>
										<div className="m-10">
											<div className={"col-12 " + style.title}>
												<div className="float-right">
													<p className={style.videoBriefLegend}>
														<span className={style.roundGrey} />
														This Video
														<span className={style.roundTealish} />
														Your Average Video
													</p>
												</div>
											</div>
											<div className="col-1-3">
												<BarChart
													width="3"
													height="4"
													data={[90]}
													avarage="80"
													labels={["1M Views"]}
													isGradient
													gradientColors={["#161620", "#2f2e3d"]}
													options={{
														plugins: {
															datalabels: {
																display: false
															}
														},
														tooltips: {
															enabled: false
														},
														legend: {
															display: false
														},
														scales: {
															yAxes: [
																{
																	display: false,
																	ticks: {
																		min: 0,
																		max: 100,
																		stepSize: 10
																	}
																}
															],
															xAxes: [
																{
																	barPercentage: 0.5,
																	categorySpacing: 0,
																	gridLines: {
																		display: false
																	}
																}
															]
														}
													}}
												/>
											</div>
											<div className="col-1-3">
												<BarChart
													width="3"
													height="4"
													data={[76]}
													avarage="75"
													labels={["60k Likes"]}
													isGradient
													gradientColors={["#161620", "#2f2e3d"]}
													options={{
														responsive: true,
														maintainAspectRatio: true,
														tooltips: {
															enabled: false
														},
														plugins: {
															datalabels: {
																display: false
															}
														},

														legend: {
															display: false
														},
														scales: {
															yAxes: [
																{
																	display: false,
																	ticks: {
																		min: 0,
																		max: 100,
																		stepSize: 10
																	}
																}
															],
															xAxes: [
																{
																	barPercentage: 0.5,
																	categorySpacing: 0,
																	gridLines: {
																		display: false
																	}
																}
															]
														}
													}}
												/>
											</div>
											<div className="col-1-3">
												<BarChart
													width="3"
													height="4"
													data={[45]}
													avarage="60"
													labels={["123K Shares"]}
													yLabels={[
														"1M",
														"500K",
														"100K",
														"80K",
														"60K",
														"40K",
														"10K",
														"0"
													]}
													isGradient
													gradientColors={["#161620", "#2f2e3d"]}
													options={{
														tooltips: {
															enabled: false
														},
														plugins: {
															datalabels: {
																display: false
															}
														},
														legend: {
															display: false
														},
														scales: {
															yAxes: [
																{
																	display: false,
																	gridLines: {
																		display: false
																	},

																	ticks: {
																		min: 0,
																		max: 100,
																		stepSize: 10
																	}
																}
															],
															xAxes: [
																{
																	barPercentage: 0.5,
																	gridLines: {
																		display: true
																	}
																}
															]
														}
													}}
												/>
											</div>
										</div>
									</Card>
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
												<Link className={style.tab} to="/marketview/audience">
													All
												</Link>
												{videoTabsDataBottom.map(link => (
													<Link
														key={link.url}
														to={"/marketview/audience/" + link.url}
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
)(Audince);
