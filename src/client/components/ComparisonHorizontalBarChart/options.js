export const barChartOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    display: false,
  },
  plugins: {
    datalabels: false,
  },
  chartArea: {
    backgroundColor: '#242b49',
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          color: '#5a6386',
          zeroLineColor: '#5a6386',
          drawTicks: false,
        },
        ticks: {
          fontColor: 'white',
          fontFamily: 'ClanOTNews',
          fontSize: 12,
          padding: 15,
          min: 0,
          max: 100,
          stepSize: 25,
          callback: function(value) {
            if (value === 0) return 0
            return value + '%'
          },
          reverse: true,
        },
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        barThickness: 16,
        ticks: {
          padding: 20,
          display: true,
          fontColor: 'transparent',
        },
      },
    ],
  },
}

export const leftPlugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
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

      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.left, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.top)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
    afterDraw: function(chart) {
      let ctx = chart.chart.ctx
      ctx.font = '12px ClanOTBold'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'left bottom'

      chart.chart.config.data.datasets.forEach(function(dataset) {
        const dataArray = dataset.data
        dataset._meta[0].data.forEach(function(bar, index) {
          ctx.fillText(
            dataArray[index] + '%',
            bar._view.x - 15,
            bar._view.y + 5
          )
        })
      })
    },
  },
]

export const rightPlugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
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

      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.left, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.top)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
    afterDraw: function(chart) {
      let ctx = chart.chart.ctx
      ctx.font = '12px ClanOTBold'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'left bottom'

      chart.chart.config.data.datasets.forEach(function(dataset) {
        const dataArray = dataset.data
        dataset._meta[1].data.forEach(function(bar, index) {
          ctx.fillText(
            dataArray[index] + '%',
            bar._view.x + 15,
            bar._view.y + 5
          )
        })
      })
    },
  },
]
