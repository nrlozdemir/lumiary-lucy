import React from 'react'

import SvgChartLine from './line';

class SvgChart extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			options: {
				xMin: 0,
				xMax: 100,
				yMin: 0,
				yMax: 40,
				line: {
					smoothing: 0.25,
					flattening: 2
				}
			},
			dataset: {
				colors: {
					path: "#303a5d"
				},
				values: [
					[0, 30],
					[this.props.value, 0],
					[100, 30]
				]
			},
			lib: {
				map(value, inMin, inMax, outMin, outMax) {
					return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
				},
				range(start, end, tick) {
					const s = Math.round(start / tick) * tick
					return Array.from({
						length: Math.floor((end - start) / tick)
					}, (v, k) => {
						return k * tick + s
					});
				}
			},
			svg: {
				w: 250,
				h: 40
			}
		}
	}

	viewbox() {
		return `0 0 ${this.state.svg.w} ${this.state.svg.h}`;
	}

	render() {
		const { dataset, options, lib, svg } = this.state;

		return (
			<svg viewBox={this.viewbox()}>
				<SvgChartLine d={dataset} o={options} svg={svg} lib={lib} />
			</svg>
		)
	}
}

export default SvgChart
