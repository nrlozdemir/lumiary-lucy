export const beforeDraw = (colors) => {
  const filteredColors = colors.filter((color) => !!color)
  if (filteredColors.length && filteredColors[0]) {
    return [
      {
        beforeDraw: (chart) => {
          let ctx = chart.chart.ctx
          let chartArea = chart.chartArea
          ctx.save()
          ctx.fillStyle = filteredColors[0]
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        },
      },
    ]
  }
  return [{}]
}

export const afterDraw = (customLine) => {
  if (customLine) {
    return [
      {
        afterDraw: (chart) => {
          let ctx = chart.chart.ctx
          let chartArea = chart.chartArea
          if (chart.options.average) {
            ctx.fillStyle = '#505050'
            ctx.fillRect(
              ((chartArea.right - chartArea.left) / 100) *
                chart.options.average +
                48,
              5,
              4,
              chartArea.bottom - chartArea.top
            )
          }
        },
      },
    ]
  }
  return [null]
}

export const datasetsDraw = (shadow) => {
  if (shadow && !!shadow.color) {
    return [
      {
        beforeDatasetsDraw: function(chart) {
          chart.ctx.shadowColor = shadow.color
          chart.ctx.shadowBlur = shadow.blur || 6
          chart.ctx.shadowOffsetX = shadow.offsetX || 2
          chart.ctx.shadowOffsetY = shadow.offsetY || 2
        },
      },
      {
        afterDatasetsDraw: function(chart) {
          chart.ctx.shadowColor = 'transparent'
          chart.ctx.shadowBlur = 0
        },
      },
    ]
  }
  return [{}]
}
