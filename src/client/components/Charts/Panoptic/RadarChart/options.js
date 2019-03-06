export const radarChartOptions = {
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: '#fff',
    cornerRadius: 0,
    titleFontColor: '#000',
    mode: 'point',
    bodyFontColor: '#000',
  },
  plugins: {
    datalabels: false,
  },
  scale: {
    gridLines: {
      display: true,
      lineWidth: 10,
    },
    pointLabels: {
      callback: function(value, index, values) {
        return '●'
      },
      fontSize: 16,
    },
    ticks: {
      display: true,
      // beginAtZero: true,
      // maxTicksLimit: 5,
      // precision: 5,
      // max: 100,
      // min: 0,
      // stepSize: 25,
    },
  },
}
