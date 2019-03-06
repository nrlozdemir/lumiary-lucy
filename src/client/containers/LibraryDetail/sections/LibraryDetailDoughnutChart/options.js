export const lineChartOptions = {
  plugins: {
    datalabels: false
  },
  tooltips: {
    position: 'nearest',
    backgroundColor: '#fff',
    titleFontColor: '#242b49',
    bodyFontColor: '#242b49',
    footerFontColor: '#242b49',
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
        color: '#5a6386',
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
        color: '#5a6386',
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
    borderColor: "#51adc0",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointRadius: 5,
    pointBackgroundColor: "#51adc0",
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
    shadowColor: "#51adc0"
  },
  {
    fill: false,
    lineTension: 0.1,
    borderColor: "#8567f0",
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointRadius: 5,
    pointBackgroundColor: "#8567f0",
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
    shadowColor: "#8567f0"
  }
];

export const selectOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
