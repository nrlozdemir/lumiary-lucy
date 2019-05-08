export const stackedChartOptions = {
  titleFontColor: '#21243B',
  bodyFontColor: '#21243B',
  footerFontColor: '#21243B',
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
  responsive: false,
  scales: {
    xAxes: [
      {
        barThickness: 52,
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
          color: '#545B79',
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
          color: '#545B79',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: false,
        },
      },
    ],
  },
  chartArea: {
    backgroundColor: '#21243B',
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
