export const doughnutOptions = {
  responsive: false,
  cutoutPercentage: 55,
  tooltips: {
    enabled: false,
  },
  legend: {
    display: false,
  },
  layout: {
    padding: 0,
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
      font: {
        size: 14,
        family: 'ClanOTBold',
      },
      color: '#fff',
    },
  },
  elements: {
    arc: {
      borderWidth: 5,
      borderColor: '#303a5d',
    },
  },
}

export const stackedChartOptions = {
  titleFontColor: '#242b49',
  bodyFontColor: '#242b49',
  footerFontColor: '#242b49',
  title: {
    display: true,
  },
  legend: {
    display: false,
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        barThickness: 56,
        stacked: true,
        ticks: {
          fontColor: '#fff',
          fontSize: 12,
          stepSize: 1,
          beginAtZero: true,
          callback: function(value, index, values) {
            return value
          },
          marginRight: 16,
        },
        gridLines: {
          display: false,
          color: '#5a6386',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: true,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#fff',
          fontSize: 12,
          stepSize: 25,
          beginAtZero: true,
          callback: function(value, index, values) {
            return value + '%'
          },
          padding: 20,
        },
        gridLines: {
          display: true,
          color: '#5a6386',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: false,
        },
      },
    ],
  },
  chartArea: {
    backgroundColor: '#242b49',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        return value + 'm'
      },
      align: 'center',
      anchor: 'center',
      color: '#fff',
      font: {
        size: 14,
        family: 'ClanOTBold',
      },
    },
  },
}
