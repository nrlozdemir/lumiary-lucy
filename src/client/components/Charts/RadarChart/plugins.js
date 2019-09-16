export const generatePlugins = (props) => {
  return (
    [{
      beforeDraw: function (chart, easing) {
        let ctx = chart.chart.ctx
        if (props.data) {
          const numberOfSides = props.data.labels.length
          const size = 202
          const Xcenter = chart.width / 2
          const Ycenter = chart.height / 2

          ctx.beginPath()
          ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0))

          for (let i = 1; i <= numberOfSides; i += 1) {
            ctx.lineTo(
              Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
              Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
            )
          }

          ctx.strokeStyle = props.themeContext.colors.bodyBackground
          ctx.lineWidth = 1
          ctx.shadowBlur = 7
          ctx.shadowOffsetY = 5
          ctx.shadowColor = '#000'
          ctx.stroke()
          ctx.shadowBlur = 0
          ctx.shadowOffsetY = 0
        }
        chart.config.data.datasets.forEach(function (dataset, i) {
          const meta = chart.controller.getDatasetMeta(i)
          meta.data.forEach(function (bar, index) {
            if (
              !!chart.config.data.labels &&
              !!chart.config.data.labels.length &&
              !!!!chart.config.data.labels[index]
            ) {
              const color = chart.config.data.labels[index].color
              const selected = chart.config.data.labels[index].selected
              const pointLabelPosition = bar._scale.getPointPosition(
                index,
                bar._scale.getDistanceFromCenterForValue(bar._scale.max) +
                (selected ? 36 : 30)
              )

              ctx.beginPath()
              // draw a circle at that point
              ctx.arc(
                pointLabelPosition.x,
                pointLabelPosition.y,
                selected ? 14 : 8,
                0,
                2 * Math.PI,
                false
              )
              if (selected) {
                ctx.lineWidth = 1
                ctx.shadowBlur = 5
                ctx.shadowOffsetY = 3
                ctx.shadowColor = 'rgba(0, 0, 0, 1)'
                ctx.strokeStyle = chart.options.scale.pointLabels
                ctx.stroke()
                ctx.shadowBlur = 0
                ctx.shadowOffsetY = 0
              }

              ctx.fillStyle = color
              ctx.fill()
              ctx.closePath()
            }

            // const asd = chart.scales.scale.ctx
            // asd.shadowBlur = 4
            // asd.shadowOffsetY = 2
            // asd.shadowColor = 'rgba(0, 0, 0, 0.5)'
          })
        })
      },
      beforeDatasetsDraw: function (chart) {
        // Run function when before apply the datasets draw chart
        let ctx = chart.chart.ctx
        chart.config.data.datasets.forEach(function (dataset, i) {
          const meta = chart.controller.getDatasetMeta(i)
          meta.data.forEach(function (bar, index) {
            if (
              !!chart.config.data.labels &&
              !!chart.config.data.labels.length &&
              !!!!chart.config.data.labels[index]
            ) {
              const pointPosition = bar._scale.getPointPosition(
                index,
                bar._scale.getDistanceFromCenterForValue(bar._scale.max) + 13
              )
              ctx.beginPath()
              ctx.moveTo(pointPosition.x, pointPosition.y)
              ctx.lineTo(chart.scale.xCenter, chart.scale.yCenter)
              ctx.lineWidth = 1
              ctx.strokeStyle = chart.options.scale.angleLines.customColor
              ctx.stroke()
              ctx.closePath()
            }
          })
        })
        const margin = (chart.chartArea.bottom - chart.chartArea.top) / 10
        chart.chart.ctx.fillStyle = props.themeContext.colors.chartTickColor
        chart.chart.ctx.font = '10px ClanOT'
        // chart.chart.ctx.fillText(
        //   `0`,
        //   chart.scale.xCenter - 3,
        //   chart.scale.yCenter + 3
        // )

        // top ticks
        chart.scale.ticksAsNumbers.map((tick, i) => {
          if (i > 0) {
            chart.chart.ctx.fillText(
              `${tick.toFixed(0)}%`,
              chart.scale.xCenter - 7,
              chart.scale.yCenter - margin * i + 4
            )
          }
        })

        // right ticks
        chart.scale.ticksAsNumbers.map((tick, i) => {
          if (i > 0) {
            chart.chart.ctx.fillText(
              `${tick.toFixed(0)}%`,
              chart.scale.xCenter + margin * i - 10,
              chart.scale.yCenter + 4
            )
          }
        })

        // bottom ticks
        chart.scale.ticksAsNumbers.map((tick, i) => {
          if (i > 0) {
            chart.chart.ctx.fillText(
              `${tick.toFixed(0)}%`,
              chart.scale.xCenter - 7,
              chart.scale.yCenter + margin * i + 4
            )
          }
        })

        // left ticks
        chart.scale.ticksAsNumbers.map((tick, i) => {
          if (i > 0) {
            chart.chart.ctx.fillText(
              `${tick.toFixed(0)}%`,
              chart.scale.xCenter - margin * i - 10,
              chart.scale.yCenter + 4
            )
          }
        })
      },
    }]
  )
}