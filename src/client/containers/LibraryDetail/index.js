/**
 *
 * LibraryDetail
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import Slider from "rc-slider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import style from "./style.scss";
import makeSelectLibraryDetail from "Selectors/LibraryDetail.js";
import SingleItemSlider from "Components/SingleItemSlider";
import ProgressBar from "Components/ProgressBar";
import { Radar } from "react-chartjs-2";
import {
	videoList,
	slideImages,
	barData,
	barDataOptions,
	doughnutData,
	radarData,
	sliderMarks,
	sliderWithThumbnails
} from "./options";

/* eslint-disable react/prefer-stateless-function */
export class LibraryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.slide = React.createRef();
		this.state = {
			selectedImage: null,
			sliderVal: 0,
			maxValue: 1000
		};
	}
	componentDidMount() {
		this.setState({
			maxValue: this.slide.current.scrollWidth - this.slide.current.offsetWidth
		});
	}
	onChangeSlider(e) {
		this.setState({ sliderVal: e }, this.slide.current.scrollTo(e * 5, 0));
	}

	render() {
		const { match } = this.props;
		return (
			<React.Fragment>
				<div className={style.header}>
					<div className="ml-40">
						<Link to="/library">
							<span className="qf-iconLeft-Arrow" />
							Back
						</Link>
					</div>
					<div>Video Name</div>
					<div className="mr-40">
						<Link to={`/library/${match.params.videoId}/compare`}>
							Compare mode
						</Link>
					</div>
				</div>
				<div className="grid-container mr-20 ml-20 mt-72">
					<div className="col-6">
						<img
							src="https://picsum.photos/588/360?image=20"
							className="img-responsive  shadow-1"
						/>
					</div>
					<div className="col-6 bg-dark-grey-blue shadow-1">
						<div>
							<div className={style.chartHeader}>
								<div className="col-6-no-gutters">
									<div className={style.socialIcons}>
										<div className="col-4">Published</div>
										<div className="col-8">
											<span className="qf-iconFacebook" />
											<span className="qf-iconInstagram" />
											<span className="qf-iconSnapchat" />
											<span className="qf-iconTwitter" />
											<span className="qf-iconYoutube" />
											<span className="qf-iconPinterest" />
										</div>
									</div>
								</div>
								<div className="col-6">
									<div className={style.legend}>
										<div className="col-6-no-gutters">
											<div className="float-right mr-16">
												<span className="bg-coral-pink" />
												This video
											</div>
										</div>
										<div className="col-6-no-gutters">
											<span className="bg-cool-blue" />
											Average Video
										</div>
									</div>
								</div>
							</div>
							<Bar
								data={barData}
								width={500}
								options={barDataOptions}
								height={185}
							/>
							<div className={style.chartLabels}>
								<div className={style.label}>
									<span className="font-primary text-bold font-size-24 display-block">
										827.8k
									</span>
									<span className="color-cool-grey font-secondary-second font-size-12 display-block">
										BlaBla
									</span>
								</div>
								<div className={style.label}>
									<span className="font-primary text-bold font-size-24 display-block">
										481.7k
									</span>
									<span className="color-cool-grey font-secondary-second font-size-12 display-block">
										BlaBla
									</span>
								</div>
								<div className={style.label}>
									<span className="font-primary text-bold font-size-24 display-block">
										265.2k
									</span>
									<span className="color-cool-grey font-secondary-second font-size-12 display-block">
										BlaBla
									</span>
								</div>
								<div className={style.label}>
									<span className="font-primary text-bold font-size-24 display-block">
										126.3k
									</span>
									<span className="color-cool-grey font-secondary-second font-size-12 display-block">
										BlaBla
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
					<div className={style.radialChartsContainer}>
						{doughnutData.map((chart, i) => (
							<div className={style.radialChart} key={i}>
								<h1 className="font-primary text-bold text-center">
									{chart.title}
								</h1>
								<p className="color-cool-grey font-secondary-second font-size-12 display-block text-center pt-16 ">
									{chart.secondTitle}
								</p>
								<div className={style.doughnutChartContainer}>
									<Doughnut
										options={{
											cutoutPercentage: 85,
											tooltips: {
												enabled: false
											},
											legend: {
												display: false
											},
											layout: {
												padding: 40
											}
										}}
										width={150}
										height={150}
										data={{
											labels: ["Red", "Green"],
											datasets: [
												{
													data: [chart.average, 100 - chart.average],
													borderColor: "transparent",
													backgroundColor: ["#ff556f", "#51adc0"],
													hoverBackgroundColor: ["#ff556f", "#51adc0"]
												}
											]
										}}
									/>
									<p>{chart.average}%</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{this.state.selectedImage ? (
					<div className="col-12 mt-48">
						<div className="col-6-no-gutters bg-black">
							<div className="mt-48 ml-48 mr-48">
								<SingleItemSlider slideImages={sliderWithThumbnails} />
							</div>
						</div>
						<div className="col-6-no-gutters ">
							<Tabs>
								<TabList className={style.tabList}>
									<Tab selectedClassName={style.selectedTab}>Demographics</Tab>
									<Tab selectedClassName={style.selectedTab}>Objects</Tab>
									<Tab selectedClassName={style.selectedTab}>Color</Tab>
									<span
										className={style.cancelButton + " qf-iconX"}
										onClick={() => this.setState({ selectedImage: false })}
									/>
								</TabList>
								<TabPanel>
									<div className={style.tabPanel}>
										{slideImages.map((image, i) => (
											<div
												className={style.tabPanelItem + " grid-container mt-16"}
												key={i}
											>
												<div className="col-5-no-gutters">
													<img src={image.src} className="img-responsive" />
												</div>
												<div className="col-7-no-gutters">
													<div className="pt-20">
														{image.options.map((option, z) => (
															<div
																className={style.progressbarContainer}
																key={z}
															>
																<div className={style.barOptions}>
																	<p>{option.text}</p>
																	<p>{option.accurate}% Accurate</p>
																</div>
																<ProgressBar
																	width={option.percentage}
																	customBarClass={style.progressBar}
																	customPercentageClass={style.percentage}
																/>
															</div>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								</TabPanel>
								<TabPanel>
									<div className={style.tabPanel}>
										<div
											className={style.tabPanelItem + " grid-container mt-16"}
										>
											<div className="col-5-no-gutters">
												<img
													src="https://picsum.photos/500/270?image=8"
													className="img-responsive"
												/>
											</div>
											<div className="col-7-no-gutters">
												<div className="pt-32">
													<div className={style.progressbarContainer}>
														<div className={style.barOptions}>
															<p>Football Helmet</p>
															<p>78% Accurate</p>
														</div>
														<ProgressBar
															width={78}
															customBarClass={style.progressBar}
															customPercentageClass={style.percentage}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</TabPanel>
								<TabPanel>
									<div className={style.radarChartContainer}>
										<Radar
											data={radarData}
											options={{
												legend: {
													display: false
												},
												tooltips: {
													backgroundColor: "#fff",
													cornerRadius: 0,
													titleFontColor: "#000",
													mode: "point",
													bodyFontColor: "#000"
												},
												layout: {
													padding: {
														left: 35,
														right: 50,
														top: 0,
														bottom: 0
													}
												},

												scale: {
													gridLines: {
														display: true,
														lineWidth: 10
													},
													pointLabels: {
														callback: function(value, index, values) {
															return "●";
														},
														fontSize: 30,
														fontColor: radarData.labels.map(lbl => lbl)
													},
													ticks: {
														display: false,
														maxTicksLimit: 5
													}
												}
											}}
										/>
									</div>
								</TabPanel>
							</Tabs>
						</div>
					</div>
				) : (
					<div className="col-12 shadow-1 mt-48 bg-dark-grey-blue pb-32">
						<div className="col-12">
							<h2 className="font-secondary-first text-center pt-48 pb-48 font-size-18">
								Shot by Shot
							</h2>
							<div className={style.sliderContainer} ref={this.slide}>
								{videoList.map((video, i) => (
									<div
										className={style.image}
										onClick={() => this.setState({ selectedImage: i })}
										key={i}
									>
										<img src={video} className={style.originalImage} />
										<img src={video} className={style.hover} />
									</div>
								))}
							</div>
						</div>
						<div className="col-12 mt-16 mb-16">
							<Slider
								step={null}
								defaultValue={8}
								onAfterChange={val => this.onChangeSlider(val)}
								handleStyle={{
									width: "40px",
									height: "40px",
									marginTop: "-12px"
								}}
								trackStyle={{
									height: "16px",
									backgroundColor: "transparent"
								}}
								min={8}
								max={102}
								railStyle={{
									height: "16px",
									borderRadius: "10px",
									backgroundColor: "#242b49"
								}}
								dotStyle={{
									width: "1px",
									height: "16px",
									border: 0,
									top: "0px"
								}}
								marks={sliderMarks}
							/>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

LibraryDetail.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	libraryDetail: makeSelectLibraryDetail()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(LibraryDetail);
