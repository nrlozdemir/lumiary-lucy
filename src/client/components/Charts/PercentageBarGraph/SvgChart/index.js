import React from 'react'
import SvgChartLine from './line'

class SvgChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        xMin: 0,
        xMax: 100,
        yMin: 0,
        yMax: this.props.height,
        line: {
          smoothing: 0.25,
          flattening: 0.5,
        },
      },
      dataset: {
        colors: {
          path: this.props.backgroundColor || '#373F5B',
        },
        values: [],
      },
      lib: {
        map(value, inMin, inMax, outMin, outMax) {
          return (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
          )
        },
        range(start, end, tick) {
          const s = Math.round(start / tick) * tick
          return Array.from(
            {
              length: Math.floor((end - start) / tick),
            },
            (v, k) => {
              return k * tick + s
            }
          )
        },
      },
      svg: {
        w: this.props.width,
        h: this.props.height,
      },
    }
  }

  calculateDataSet() {
    const min = this.props.value - 20 < 0 ? 0 : this.props.value - 20
    const max = this.props.value + 20 > 100 ? 100 : this.props.value + 20

    this.setState({
      dataset: {
        ...this.state.dataset,
        values: [
          [0, this.props.height - 5],
          [min, this.props.height - 10],
          [this.props.value, 0],
          [max, this.props.height - 10],
          [100, this.props.height - 5],
        ],
      },
    })
  }

  componentDidMount() {
    this.calculateDataSet()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.calculateDataSet()
    }
  }

  viewbox() {
    return `0 0 ${this.state.svg.w} ${this.state.svg.h}`
  }

  render() {
    const { dataset, options, lib, svg } = this.state

    return (
      <svg viewBox={this.viewbox()}>
        <SvgChartLine d={dataset} o={options} svg={svg} lib={lib} />
      </svg>
    )
  }
}

export default SvgChart
