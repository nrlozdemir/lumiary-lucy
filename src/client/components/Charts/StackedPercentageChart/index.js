import React from 'react'
import { helpers } from 'chart.js'
import { Line, Chart } from 'react-chartjs-2'
import { randomKey } from 'Utils'
import { chartCombineDataset } from 'Utils/datasets'
import { fromJS } from 'immutable'
import { percentageGraphOptions } from './defaultOptions'
import { withTheme } from 'ThemeContext/withTheme'

import { drawLine, drawBackgroundLine, calcLinePoints } from './utils'

class StackedPercentageChart extends React.Component {
  constructor(props) {
    super(props)
    const themes = this.props.themeContext.colors
    this.state = {
      options: {
        width: 1200,
        height: 300,
        options: {
          animation: false,
          responsive: false,
          plugins: {
            datalabels: false,
          },
          legend: {
            display: false,
          },
          tooltips: {
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor: '#fff',
            titleFontColor: '#21243B',
            bodyFontColor: '#21243B',
            footerFontColor: '#21243B',
            xPadding: 14,
            yPadding: 14,
            cornerRadius: 10,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: themes.chartStadiumBarBorder,
                  lineWidth: 0.7,
                  drawBorder: true,
                  drawTicks: false,
                },
                ticks: {
                  fontColor: themes.textColor,
                  fontSize: 12,
                  fontFamily: 'ClanOTNews',
                  fontWeight: 'normal',
                  stepSize: 1,
                  beginAtZero: true,
                  padding: 20,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: themes.chartStadiumBarBorder,
                  lineWidth: 0.7,
                  drawBorder: true,
                  drawTicks: false,
                },
                ticks: {
                  display: true,
                  fontColor: themes.textColor,
                  fontSize: 12,
                  fontFamily: 'ClanOTNews',
                  fontWeight: 'normal',
                  max: 250,
                  stepSize: 50,
                  beginAtZero: true,
                  padding: 20,
                },
              },
            ],
          },
          color: 'blue',
        },
      },
      colors: {
        green: ['#2fd7c4', '#39e5d1', '#2fd7c4'],
        blue: ['#5292e5', '#5d9ef2', '#5292e5'],
        lightGrey: ['#c6c9d7', '#c6c9d7', '#c6c9d7'],
        grey: ['#acb0be', '#acb0be', '#acb0be'],
        purple: ['#8562f3', '#9576f5', '#8562f3'],
        darkgrey: ['#505050', '#505050', '#505050'],
        white: ['#ffffff', '#ffffff', '#ffffff'],
        '#2FD7C4': ['#2FD7C4', '#2FD7C4', '#2FD7C4'],
        '#8562F3': ['#8562F3', '#8562F3', '#8562F3'],
        '#5292E5': ['#5292E5', '#5292E5', '#5292E5'],
        '#ACB0BE': ['#ACB0BE', '#ACB0BE', '#ACB0BE'],
        '#545b79': ['#545b79', '#545b79', '#545b79'],
        '#ff556f': ['#ff556f', '#ff556f', '#ff556f'],
        '#3edcca': ['#3edcca', '#3edcca', '#3edcca'],
        '#229a78': ['#229a78', '#229a78', '#229a78'],
        '#fff20d': ['#fff20d', '#fff20d', '#fff20d'],
        '#9576f5': ['#9576f5', '#9576f5', '#9576f5'],
        '#ffacb9': ['#ffacb9', '#ffacb9', '#ffacb9'],
        '#eb7919': ['#eb7919', '#eb7919', '#eb7919'],
      },
    }
  }

  chartDraw({
    vm,
    ctx,
    height,
    config,
    _loop,
    _children,
    colors,
    themeContext,
    percentageGraph,
  }) {
    const valueOrDefault = helpers.valueOrDefault

    const spanGaps = vm.spanGaps
    const points = _children.slice()
    const globalOptionLineElements = {}
    const globalDefaults = {}

    drawBackgroundLine(
      ctx,
      vm,
      globalOptionLineElements,
      globalDefaults,
      valueOrDefault
    )

    ctx.beginPath()

    if (_loop && points.length) {
      points.push(points[0])
    }

    const lines = calcLinePoints(ctx, points, helpers, spanGaps)

    ctx.save()
    ctx.stroke()

    if (config.options.chartType === 'percentageGraph') {
      const themes = themeContext.colors
      percentageGraph({
        ctx,
        height,
        config,
        colors,
        themes,
        lines,
      })
    }
  }

  percentageGraph({ ctx, height, config, colors, themes, lines }) {
    const {
      barWidth = 3,
      barSpaceWidth = 2,
      color,
      tickColor = themes.topValueColor,
    } = config.options

    let gradient = ctx.createLinearGradient(0, 0, 180, 800)
    if (!!color && !!colors[color]) {
      ;[...Array(3)].map((v, i) => {
        gradient.addColorStop(i * 0.5, colors[color][i])
      })
    } else {
      gradient.addColorStop(0, colors['darkgrey'][0])
      gradient.addColorStop(1, colors['darkgrey'][1])
    }

    ctx.restore()
    const findYMaxValue = Object.values(lines).reduce((p, n) =>
      p.currentVLine.y > n.currentVLine.y ? n : p
    )
    const findYMaxIndex = Object.values(lines).findIndex(
      (l) => l.currentVLine.y === findYMaxValue.currentVLine.y
    )

    ctx.beginPath()
    drawLine(
      ctx,
      lines,
      findYMaxIndex,
      barWidth,
      barSpaceWidth,
      height,
      gradient,
      'prev'
    )

    drawLine(
      ctx,
      lines,
      findYMaxIndex,
      barWidth,
      barSpaceWidth,
      height,
      gradient,
      'next'
    )
    ctx.save()

    const topValueRightPosition = findYMaxValue.currentVLine.x - barWidth
    ctx.beginPath()
    ctx.restore()
    ctx.moveTo(topValueRightPosition, height + findYMaxValue.currentVLine.y)
    ctx.lineTo(topValueRightPosition, findYMaxValue.currentVLine.y)
    ctx.lineWidth = barWidth
    ctx.strokeStyle = tickColor
    ctx.stroke()
    ctx.save()
  }

  render() {
    const { themeContext } = this.props
    const { options, colors } = this.state

    if (!themeContext) return null

    const chartDraw = this.chartDraw
    const percentageGraph = this.percentageGraph
    Chart.helpers.extend(Chart.elements.Line.prototype, {
      draw: function() {
        const {
          _view: vm,
          _chart: { ctx, height, config },
          _loop,
          _children,
        } = this

        return chartDraw({
          vm,
          ctx,
          height,
          config,
          _loop,
          _children,
          colors,
          themeContext,
          percentageGraph,
        })
      },
    })

    let props = fromJS(options)
      .mergeDeep(this.props)
      .toJS()

    if (props.chartType === 'percentageGraph') {
      props.options.chartType = props.chartType
      props.options.barWidth = props.barWidth
      props.options.barSpaceWidth = props.barSpaceWidth
    }

    if (!props.dataSet) return null
    return (
      <Line
        key={Math.random()}
        data={chartCombineDataset(props.dataSet, percentageGraphOptions)}
        datasetKeyProvider={() => randomKey(5)}
        {...props}
      />
    )
  }
}

export default withTheme(StackedPercentageChart)
