import React from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import style from './style.scss'

defaults.global.defaultFontFamily = 'ClanOTBold'
defaults.global.defaultFontSize = 14
defaults.global.defaultFontWeight = 700

const propTypes = {}
const defaultProps = {
	width: 270,
	height: 270,
	responsive: true,
	tooltip: false,
	legend: false,
	layoutPadding: 0,
	fillTextColor: '#fff',
	fillTextFontSize: '14px',
	fillTextFontFamily: 'ClanOTBold'
}
export default class DoughnutChart extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { width, height, data,
			responsive, legend, tooltip,
			layoutPadding,
			fillTextColor, fillTextFontSize, fillTextFontFamily, fillText, fillTextX, fillTextY, fillTextMaxWidth,
			labelsPosition, labelsClasName, labelsData } = this.props
		let plugins = []

		console.log(this.props)

		if(fillText) {
			plugins.push({
				beforeDraw: function(chart) {
					const ctx = chart.chart.ctx
					const { top, bottom, left, right } = chart.chartArea
					ctx.save()
					ctx.fillStyle = fillTextColor
					ctx.font = (fillTextFontSize + ' ' + fillTextFontFamily)
					ctx.fillText(
						fillText,
						(fillTextX && fillTextX > 0)
							? fillTextX
							: ((bottom - top) / 2 - 55),
						(fillTextY && fillTextY > 0)
							? fillTextY
							: ((right - left) / 2 + 4),
						(fillTextMaxWidth && fillTextMaxWidth > 0)
							? fillTextMaxWidth
							: (right - left)
					)
					ctx.restore()
				},
			})
		}

		return (
			<React.Fragment>
				<Doughnut
					width={width}
					height={height}
					data={{
						labels: [...data],
						datasets: [
							{
								data: [...data],
								borderColor: '#303a5d',
								backgroundColor: ['#acb0be', '#8567f0', '#D0506C', '#51adc0'],
								hoverBackgroundColor: ['#acb0be', '#8567f0', '#D0506C', '#51adc0'],
							},
						],
					}}
					plugins={plugins}
					options={{
						responsive: responsive,
						cutoutPercentage: 55,
						tooltips: {
							enabled: tooltip
						},
						legend: {
							display: legend
						},
						layout: {
							padding: layoutPadding
						},
						plugins: {
							datalabels: {
								formatter: (value) => {
									return (value + "%");
								},
								color: '#fff',
							}
						},
						elements: {
							arc: {
								borderWidth: 5,
								hoverBorderColor: "#303a5d"
							}
						}
					}}
				/>
			</React.Fragment>
		)
	}
}

DoughnutChart.propTypes = propTypes
DoughnutChart.defaultProps = defaultProps
