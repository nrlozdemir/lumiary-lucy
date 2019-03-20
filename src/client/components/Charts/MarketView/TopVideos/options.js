export const chartOptions = {
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: '#fff',
    titleFontColor: '#242b49',
    bodyFontColor: '#242b49',
    footerFontColor: '#242b49',
    mode: 'index',
    intersect: false,
    xPadding: 10,
    yPadding: 16
  },
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: {
        color: '#5a6386',
        display: true,
        drawTicks: false
      },
      ticks: {
        fontColor: "#fff",
        fontSize: 12,
        stepSize: 1,
        beginAtZero: true,
        padding: 15,
        callback: function (value, index, values) {
          return value;
        }
      },
      barThickness: 56
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        color: '#5a6386',
        display: true,
        drawTicks: false
      },
      ticks: {
        fontColor: "#fff",
        fontSize: 12,
        stepSize: 25,
        beginAtZero: true,
        padding: 15,
        max: 100,
        callback: function (value, index, values) {
          return value + '%';
        }
      }
    }]
  }
};
