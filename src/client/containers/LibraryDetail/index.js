import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { bindActionCreators, compose } from "redux";
import { reduxForm } from "redux-form";

import { chartCombineDataset } from "Utils";
import { actions, makeSelectLibraryDetail } from "Reducers/libraryDetail";

import LibraryDetailHeader from "./sections/LibraryDetailHeader";
import LibraryDetailChartHeader from "./sections/LibraryDetailChartHeader";
import LibraryDetailDoughnutChart from "./sections/LibraryDetailDoughnutChart";
import LibraryDetailColorTemperature from "./sections/LibraryDetailColorTemperature";
import LibraryDetailShotByShot from "./sections/LibraryDetailShotByShot";

/* eslint-disable react/prefer-stateless-function */
export class LibraryDetail extends React.Component {
	constructor(props) {
		super(props)
		this.slide = React.createRef()
		this.state = {
			sliderVal: 0,
			maxValue: 1000,
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
		}
	}

	componentDidMount() {
		const { getLibraryDetailRequest, match } = this.props

		if (match.params.videoId) {
			getLibraryDetailRequest(match.params.videoId)
		}
	}

	componentDidUpdate(prevProps) {
		const { match: prevMatch } = prevProps
		const { match, getLibraryDetailRequest } = this.props

		if (prevMatch.params.videoId !== match.params.videoId) {
			getLibraryDetailRequest(match.params.videoId)
		}
	}

	onChangeSlider(e) {
		this.setState({ sliderVal: e }, this.slide.current.scrollTo(e * 5, 0))
	}


	render() {
		const {
			libraryDetail: { libraryDetail }
		} = this.props

		if (!libraryDetail) return false

		let {
			videoList,
			slideImages,
			barData,
			colorTempData,
			doughnutData,
			lineChartData,
			radarData,
			sliderWithThumbnails
		} = libraryDetail

		const {
			isDoughnutVisible,
			isColorTempVisible,
			barData_DatasetOptions,
			radarData_DatasetOptions,
			lineChartData_DatasetOptions
		} = this.state

		barData = chartCombineDataset(barData, barData_DatasetOptions)

		radarData = chartCombineDataset(radarData, radarData_DatasetOptions)

		lineChartData = chartCombineDataset(
			lineChartData,
			lineChartData_DatasetOptions,
			{
				beforeDraw: function(chart, easing) {
					if (
						chart.config.options.chartArea &&
						chart.config.options.chartArea.backgroundColor
					) {
						const ctx = chart.chart.ctx
						const chartArea = chart.chartArea

						ctx.save()
						ctx.fillStyle = chart.config.options.chartArea.backgroundColor
						ctx.fillRect(
							chartArea.left,
							chartArea.top,
							chartArea.right - chartArea.left,
							chartArea.bottom - chartArea.top
						)
						ctx.restore()
					}
				}
			}
		)

		return (
			<React.Fragment>
				<LibraryDetailHeader
					videoName="My Awesome Video"
					publishedPlatform="Facebook"
				/>
				<LibraryDetailChartHeader
					barData={barData}
				/>
				<LibraryDetailDoughnutChart
					doughnutData={doughnutData}
					lineChartData={lineChartData}
				/>
				<LibraryDetailColorTemperature
					colorTempData={colorTempData}
				/>
				<LibraryDetailShotByShot
					sliderWithThumbnails={sliderWithThumbnails}
					slideImages={slideImages}
					radarData={radarData}
					videoList={videoList}
				/>
			</React.Fragment>
		)
	}
}

LibraryDetail.propTypes = {
	libraryDetail: PropTypes.object,
	getLibraryDetailRequest: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
	libraryDetail: makeSelectLibraryDetail()
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(
	reduxForm({
		form: "libraryDetail"
	}),
	withConnect
)(LibraryDetail)
