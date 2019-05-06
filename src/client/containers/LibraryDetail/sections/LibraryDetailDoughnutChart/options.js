export const lineChartOptions = {
  plugins: {
    datalabels: false
  },
  tooltips: {
    position: 'nearest',
    backgroundColor: '#fff',
    titleFontColor: '#21243B',
    bodyFontColor: '#21243B',
    footerFontColor: '#21243B',
    xPadding: 10,
    yPadding: 16,
    cornerRadius: 3,
    callbacks: {
      title: function(tooltipItem, data) {
        const { datasetIndex, index } = tooltipItem[0];
        if (datasetIndex === 1) {
          return `${data.datasets[datasetIndex].data[index]}% of industry is shot in 24fps`;
        } else {
          return `${data.datasets[datasetIndex].data[index]}% of frames is shot in 24fps`;
        }
      },
      label: function(tooltipItem, data) {
        return null
      }
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: true,
        color: '#545B79',
        lineWidth: 0.7,
        drawBorder: true,
        drawTicks: false
      },
      ticks: {
        fontColor: "#fff",
        fontSize: 12,
        stepSize: 1,
        beginAtZero: true,
        callback: function(value, index, values) {
          return '    ' + value;
        }
      }
    }],
    yAxes: [{
      gridLines: {
        display: true,
        color: '#545B79',
        lineWidth: 0.7,
        drawBorder: true,
        drawTicks: false
      },
      ticks: {
        fontColor: "#fff",
        fontSize: 12,
        stepSize: 25,
        beginAtZero: true,
        marginRight: 16,
        callback: function(value, index, values) {
          return value + '%      '
        }
      }
    }]
  },
};

export const lineChartData_DatasetOptions = [
  {
    fill: false,
    lineTension: 0.1,
    borderColor: "#2FD7C4",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointRadius: 5,
    pointBackgroundColor: "#2FD7C4",
    pointBorderColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointHitRadius: 10,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowBlur: 5,
    shadowColor: "#2FD7C4"
  },
  {
    fill: false,
    lineTension: 0.1,
    borderColor: "#8562F3",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointRadius: 5,
    pointBackgroundColor: "#8562F3",
    pointBorderColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointHitRadius: 10,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowBlur: 5,
    shadowColor: "#8562F3"
  }
];
