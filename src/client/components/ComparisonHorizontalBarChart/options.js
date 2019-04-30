export const barChartOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0
        let dataArr = ctx.chart.data.datasets[0].data
        dataArr.map((data) => {
          sum += data
        })
        let percentage = ((value * 100) / sum).toFixed(0) + '%'
        return percentage
      },
      anchor: 'start',
      align: 'left',
      color: '#fff',
    },
  },
  chartArea: {
    backgroundColor: '#21243B',
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          color: '#545B79',
          zeroLineColor: '#545B79',
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

export const plugins = [
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
  },
]
