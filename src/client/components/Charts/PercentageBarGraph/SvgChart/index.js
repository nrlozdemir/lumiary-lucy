import React from 'react'
import classnames from 'classnames'
import SvgChartLine from './line'
import style from '../style.scss'

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
          flattening: 1.5,
        },
        percentage: this.props.percentage,
      },
      dataset: {
        values: [[0, 5], [this.props.percentage, 35], [100, 5]],
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
        w: this.props.width || 250,
        h: this.props.height || 40,
      },
    }
  }

  viewbox() {
    return `0 0 ${this.state.svg.w} ${this.state.svg.h}`
  }

  render() {
    const { color, xSmall, percentage, width, id } = this.props
    const { dataset, options, lib, svg } = this.state

    const lineCount = Math.round(width / 3)
    const active = Math.round((lineCount / 100) * percentage)

    return (
      <svg viewBox={this.viewbox()}>
        <SvgChartLine d={dataset} o={options} svg={svg} lib={lib} id={id} />
        {[...Array(lineCount)].map((v, i) => (
          <rect
            key={i}
            data-index={i + 1 > active - 15 && i + 1 - (active - 15)}
            width="2"
            height={svg.h}
            x={3 * i}
            y="0"
            fill={color}
            className={classnames(style.percentageGraphBar, {
              [style.percentageGraphXSmall]: xSmall,
            })}
            mask={`url(#${id}-mask)`}
          ></rect>
        ))}
      </svg>
    )
  }
}

export default SvgChart
