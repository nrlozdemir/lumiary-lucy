export const chartOptions = {
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: '#fff',
    titleFontColor: '#21243B',
    bodyFontColor: '#21243B',
    footerFontColor: '#21243B',
    mode: 'index',
    intersect: false,
    xPadding: 10,
    yPadding: 16
  },
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: {
        color: '#545B79',
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
        color: '#545B79',
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
