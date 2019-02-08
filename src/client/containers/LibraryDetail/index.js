import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Bar, Doughnut, Radar } from "react-chartjs-2";
import Slider from "rc-slider";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Field, reduxForm } from "redux-form";

import style from "./style.scss";
import { chartCombineDataset } from "Utils";
import { actions } from "Reducers/LibraryDetail";
import makeSelectLibraryDetail from "Selectors/LibraryDetail.js";
import SingleItemSlider from "Components/SingleItemSlider";
import ProgressBar from "Components/ProgressBar";
import PointerCard from "Components/PointerCard";
import Select from "Components/Form/Select";
import LineChart from "Components/LineChart/Chart";
import ColorTemperatureChart from "Components/ColorTemperatureChart";

import { barDataOptions, selectOptions } from "./options";

/* eslint-disable react/prefer-stateless-function */
export class LibraryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.slide = React.createRef();
		this.state = {
			selectedImage: null,
			sliderVal: 0,
			maxValue: 1000,
			isDoughnutVisible: true,
			isColorTempVisible: true,
			barData_DatasetOptions: [
				{
					label: "first",
					backgroundColor: "#ff556f",
					borderColor: "#ff556f",
					borderWidth: 1,
					hoverBackgroundColor: "#ff556f",
					hoverBorderColor: "#ff556f"
				},
				{
					label: "second",
					backgroundColor: "#51adc0",
					borderColor: "#51adc0",
					borderWidth: 1,
					hoverBackgroundColor: "#51adc0",
					hoverBorderColor: "#51adc0"
				}
			],
			radarData_DatasetOptions: [
				{
					label: "My First dataset",
					backgroundColor: "rgba(255, 85, 111,0.6)",
					borderColor: "transparent",
					pointBackgroundColor: "rgb(255, 85, 111,1)",
					pointBorderColor: "transparent"
				},
				{
					label: "My Second dataset",
					backgroundColor: "rgba(81, 173, 192,0.6)",
					borderColor: "transparent",
					pointBackgroundColor: "rgba(81, 173, 192,1)",
					pointBorderColor: "transparent"
				}
			],
			lineChartData_DatasetOptions: [
				{
					fill: false,
					lineTension: 0.1,
					borderColor: "#51adc0",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointRadius: 5,
					pointBackgroundColor: "#51adc0",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointHitRadius: 10,
					shadowOffsetX: 1,
					shadowOffsetY: 1,
					shadowBlur: 5,
					shadowColor: "#51adc0"
				},
				{
					fill: false,
					lineTension: 0.1,
					borderColor: "#8567f0",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointRadius: 5,
					pointBackgroundColor: "#8567f0",
					pointBorderColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointHitRadius: 10,
					shadowOffsetX: 1,
					shadowOffsetY: 1,
					shadowBlur: 5,
					shadowColor: "#8567f0"
				}
			]
		};
	}

	componentDidMount() {
		const { getLibraryDetailRequest, match } = this.props;

		if (match.params.videoId) {
			getLibraryDetailRequest(match.params.videoId);
		}
	}

	componentDidUpdate(prevProps) {
		const { match: prevMatch } = prevProps;
		const { match, getLibraryDetailRequest } = this.props;

		if (prevMatch.params.videoId !== match.params.videoId) {
			getLibraryDetailRequest(match.params.videoId);
		}
	}

	onChangeSlider(e) {
		this.setState({ sliderVal: e }, this.slide.current.scrollTo(e * 5, 0));
	}

	changeVisibilityDoughnut() {
		this.setState(prevState => ({
			isDoughnutVisible: !prevState.isDoughnutVisible
		}));
	}

	render() {
		const {
			match,
			libraryDetail: { libraryDetail }
		} = this.props;

		if (!libraryDetail) return false;

		let {
			videoList,
			slideImages,
			barData,
			colorTempData,
			doughnutData,
			lineChartData,
			radarData,
			sliderWithThumbnails
		} = libraryDetail;

		const {
			isDoughnutVisible,
			isColorTempVisible,
			barData_DatasetOptions,
			radarData_DatasetOptions,
			lineChartData_DatasetOptions
		} = this.state;

		barData = chartCombineDataset(barData, barData_DatasetOptions);

		radarData = chartCombineDataset(radarData, radarData_DatasetOptions);

		lineChartData = chartCombineDataset(
			lineChartData,
			lineChartData_DatasetOptions,
			{
				beforeDraw: function(chart, easing) {
					if (
						chart.config.options.chartArea &&
						chart.config.options.chartArea.backgroundColor
					) {
						const ctx = chart.chart.ctx;
						const chartArea = chart.chartArea;

						ctx.save();
						ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
						ctx.fillRect(
							chartArea.left,
							chartArea.top,
							chartArea.right - chartArea.left,
							chartArea.bottom - chartArea.top
						);
						ctx.restore();
					}
				}
			}
		);

		const videoDetailHeader = classnames(
			style.videoDetailHeader,
			"grid-container mr-20 ml-20 mt-72"
		);

		return (
			<React.Fragment>
				<div className={style.header}>
					<div className="ml-40">
						<Link to="/library">
							<span className="qf-iconLeft-Arrow" />
							Back to Library
						</Link>
					</div>
					<div>Video Name</div>
					<div className="mr-40">
						Published Facebook
						<span className={style.iconWrapper}>
							<i className="qf-iconFacebook" />
						</span>
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

				<div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
					<div className={style.radialChartsContainer}>
						{isDoughnutVisible &&
							doughnutData.map((chart, i) => (
								<div
									key={i}
									className={style.radialChart}
									onClick={this.changeVisibilityDoughnut.bind(this)}
								>
									<h1 className="font-primary text-bold text-center">
										{chart.title}
									</h1>
									<div className={style.subtitle}>
										<p className="font-secondary-second font-size-12 text-center">
											{chart.secondTitle}
										</p>
									</div>
									<div className={style.doughnutChartContainer}>
										<Doughnut
											options={{
												responsive: false,
												cutoutPercentage: 60,
												tooltips: {
													enabled: false
												},
												legend: {
													display: false
												},
												layout: {
													padding: 0
												}
											}}
											width={124}
											height={124}
											data={{
												labels: ["Red", "Green"],
												datasets: [
													{
														data: [...chart.average],
														borderColor: "#303a5d",
														backgroundColor: [
															"#ffffff",
															"#ffffff",
															"#ffffff",
															"#51adc0"
														],
														hoverBackgroundColor: [
															"#ffffff",
															"#ffffff",
															"#ffffff",
															"#51adc0"
														]
													}
												]
											}}
										/>
										<p className="pt-32">
											<span className={style.textBold}>
												{chart.average[chart.average.length - 1]}%
											</span>{" "}
											of your library is shot in{" "}
											<span className={style.textBold}>
												{chart.secondTitle}
											</span>
										</p>
									</div>
								</div>
							))}
						{!isDoughnutVisible && (
							<div className={style.radialChartsContainer}>
								<div className={style.doughnutPanelTab}>
									<div className={style.doughnutPanelHeader}>
										<div onClick={this.changeVisibilityDoughnut.bind(this)}>
											<i className="qf-iconX" />
											<span className={style.panelTitle}>Frame Rate</span>
										</div>
										<div className={style.headerInfo}>
											<div>
												<p className={style.panelTitle}>24 Fps</p>
											</div>
											<div className={style.formWrapper}>
												<form onSubmit={() => console.log("object")}>
													<Field
														component={Select}
														options={selectOptions}
														id="NumberOfScenes"
														name="NumberOfScenes"
														placeholder="Select One"
														label="Number of Scenes"
														className={style.formWrapper}
													/>
													<Field
														component={Select}
														options={selectOptions}
														id="NumberOfScenes"
														name="NumberOfScenes"
														placeholder="Select One"
														label="Number of Scenes"
														className={style.formWrapper}
													/>
												</form>
											</div>
										</div>
									</div>
									<div className={style.dataWrapper}>
										<div className={style.panelChart}>
											<h1 className="font-primary text-bold text-center">
												Library Data
											</h1>
											<div className={style.doughnutChartContainer}>
												<Doughnut
													options={{
														responsive: false,
														cutoutPercentage: 60,
														tooltips: {
															enabled: false
														},
														legend: {
															display: false
														},
														layout: {
															padding: 0
														}
													}}
													width={180}
													height={180}
													data={{
														labels: ["Red", "Green"],
														datasets: [
															{
																data: [30, 12, 6, 52],
																borderColor: "#303a5d",
																backgroundColor: [
																	"#ffffff",
																	"#ffffff",
																	"#ffffff",
																	"#51adc0"
																],
																hoverBackgroundColor: [
																	"#ffffff",
																	"#ffffff",
																	"#ffffff",
																	"#51adc0"
																]
															}
														]
													}}
												/>
												<p className="pt-32">
													<span className={style.duskRound} />
													<span className={style.textBold}>{52}%</span> of your
													library is shot in{" "}
													<span className={style.textBold}>24fps</span>
												</p>
											</div>
										</div>
										<div className={style.panelChart}>
											<PointerCard
												data={{
													topTitle: "Based on Likes",
													pointerData: 140,
													bottomText: "of your library is shot in",
													likes: 50
												}}
											/>
										</div>
										<div className={style.panelChart}>
											<h1 className="font-primary text-bold text-center">
												Industry Data
											</h1>
											<div className={style.doughnutChartContainer}>
												<Doughnut
													options={{
														responsive: false,
														cutoutPercentage: 60,
														tooltips: {
															enabled: false
														},
														legend: {
															display: false
														},
														layout: {
															padding: 0
														}
													}}
													width={180}
													height={180}
													data={{
														labels: ["Red", "Green"],
														datasets: [
															{
																data: [30, 12, 6, 52],
																borderColor: "#303a5d",
																backgroundColor: [
																	"#ffffff",
																	"#ffffff",
																	"#ffffff",
																	"#8567f0"
																],
																hoverBackgroundColor: [
																	"#ffffff",
																	"#ffffff",
																	"#ffffff",
																	"#8567f0"
																]
															}
														]
													}}
												/>
												<p className="w-75 text-center pt-32">
													<span className={style.purpleRound} />
													<span className={style.textBold}>{52}%</span> of your
													library is shot in{" "}
													<span className={style.textBold}>24fps</span>
												</p>
											</div>
										</div>
									</div>
									<div className="w-100 pt-48 pb-48">
										<LineChart
											backgroundColor="#242b49"
											dataSet={lineChartData}
											width={1070}
											height={291}
											options={{
												tooltips: {
													position: "nearest",
													backgroundColor: "#fff",
													titleFontColor: "#242b49",
													bodyFontColor: "#242b49",
													footerFontColor: "#242b49",
													xPadding: 10,
													yPadding: 16,
													cornerRadius: 3,
													callbacks: {
														title: function(tooltipItem, data) {
															const { datasetIndex, index } = tooltipItem[0];
															if (datasetIndex === 1) {
																return `${
																	data.datasets[datasetIndex].data[index]
																}% of industry is shot in 24fps`;
															} else {
																return `${
																	data.datasets[datasetIndex].data[index]
																}% of frames is shot in 24fps`;
															}
														},
														label: function(tooltipItem, data) {
															return null;
														}
													}
												},
												scales: {
													xAxes: [
														{
															gridLines: {
																display: true,
																color: "#5a6386",
																lineWidth: 0.7,
																drawBorder: true,
																drawTicks: false
															},
															ticks: {
																fontColor: "#fff",
																fontSize: 12,
																stepSize: 1,
																beginAtZero: true,
																callback: function(value, index, values) {
																	return "    " + value;
																}
															}
														}
													],
													yAxes: [
														{
															gridLines: {
																display: true,
																color: "#5a6386",
																lineWidth: 0.7,
																drawBorder: true,
																drawTicks: false
															},
															ticks: {
																fontColor: "#fff",
																fontSize: 12,
																stepSize: 25,
																beginAtZero: true,
																marginRight: 16,
																callback: function(value, index, values) {
																	return value + "%      ";
																}
															}
														}
													]
												}
											}}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
					<div className={style.radialChartsContainer}>
						<div className={style.temperatureHeader}>
							<div>
								<h2>Color Temperature / Sentiment Comparison</h2>
							</div>
							<div className="d-flex align-items-center justify-space-between">
								<div className="d-flex align-items-center mr-8">
									<span className={style.redRound} />
									<p>This Video</p>
								</div>
								<div className="d-flex align-items-center mr-8">
									<span className={style.duskRound} />
									<p>Library Average</p>
								</div>
								<div className="d-flex align-items-center mr-8">
									<span className={style.purpleRound} />
									<p>Industry</p>
								</div>
							</div>
							<div className={style.inputWrapper}>
								<form>
									<Field
										component={Select}
										options={selectOptions}
										id="NumberOfScenes"
										name="NumberOfScenes"
										placeholder="Select One"
										label="Number of Scenes"
										className={style.formWrapper}
									/>
								</form>
							</div>
						</div>
						<div className={style.temperatureContentContainer}>
							{isColorTempVisible &&
								colorTempData.map((temp, i) => (
									<div className={style.temperatureContentWrapper}>
										<div className={style.temperatureContent}>
											<p className={style.textTop}>Happy</p>
											<p className={style.textRight}>Warm</p>
											<p className={style.textBottom}>Sad</p>
											<p className={style.textLeft}>Cool</p>
											<div className={style.verticalLine} />
											<div className={style.horizontalLine} />
											{temp.data.map((data, i) => (
												<span
													key={i}
													className={
														data.type === "video"
															? style.redRound
															: data.type === "library"
															? style.purpleRound
															: style.duskRound
													}
													style={{
														transform: `translateX(${data.x *
															2}%) translateY(${data.y * 2}%)`
													}}
												/>
											))}
										</div>
									</div>
								))}
						</div>
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
						<div className="col-12 mt-16 mb-16 library-detail-slider">
							<Slider
								step={null}
								defaultValue={8}
								onAfterChange={val => this.onChangeSlider(val)}
								handleStyle={{
									width: "293px",
									height: "16px",
									borderRadius: "10px",
									marginTop: "0px"
								}}
								trackStyle={{
									height: "16px",
									backgroundColor: "transparent"
								}}
								min={-5}
								max={114}
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
								marks={{
									10: { label: <p className={style.dot}>0:00</p> },
									20: { label: <p className={style.dot}>0:10</p> },
									30: { label: <p className={style.dot}>0:20</p> },
									40: { label: <p className={style.dot}>0:30</p> },
									50: { label: <p className={style.dot}>0:40</p> },
									60: { label: <p className={style.dot}>0:50</p> },
									70: { label: <p className={style.dot}>0:60</p> },
									80: { label: <p className={style.dot}>0:70</p> },
									90: { label: <p className={style.dot}>0:80</p> },
									100: { label: <p className={style.dot}>0:90</p> }
								}}
							/>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

LibraryDetail.propTypes = {
	libraryDetail: PropTypes.object,
	getLibraryDetailRequest: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  libraryDetail: makeSelectLibraryDetail()
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
	reduxForm({
		form: "libraryDetail"
	}),
	withConnect
)(LibraryDetail);
