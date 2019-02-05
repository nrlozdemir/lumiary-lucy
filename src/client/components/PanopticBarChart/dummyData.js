export const barChartData = {
  labels: [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S"
  ],
  datasets: [
    {
      label: 'Dataset 1',
      display: false,
      backgroundColor: "#51adc0",
      data: [
        45000,
        55000,
        55000,
        70000,
        55000,
        45000,
        55000
      ]
    }, {
      label: 'Dataset 2',
      backgroundColor: "#ff556f",
      data: [
        -45000,
        -50000,
        -30000,
        -55000,
        -70000,
        -55000,
        -30000
      ]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  legend: {
    display: false
  },
  tooltips: {
    position: 'nearest',
    backgroundColor: '#fff',
    titleFontColor: '#242b49',
    titleMarginBottom: 0,
    bodyFontColor: '#242b49',
    footerFontColor: '#242b49',
    xPadding: 30,
    yPadding: 15,
    callbacks: {
      title: function (tooltipItem, data) {
        if (tooltipItem[0].yLabel < 0) {
          return `${Math.abs(tooltipItem[0].yLabel / 10000)} Videos`;
        }
        return `${tooltipItem[0].yLabel / 1000}k Likes`;
      },
      label: function () {
        return null;
      }
    }
  },
  scales: {
    xAxes: [{
      barThickness: 10,
      stacked: true,
      gridLines: {
        display: false,
        tickMarkLength: 15
      },
      ticks: {
        fontColor: 'white'
      }
    }],
    yAxes: [{
      stacked: false,
      display: false,
      gridLines: {
        display: false,
        tickMarkLength: 0
      },
      ticks: {
        display: false,
        stepSize: 50000
      }
    }]
  }
}

export const wrapperBarOptions = {
  responsive: true, 
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      barThickness: 0,
      gridLines: {
        display: false,
      },
      ticks: {
        display: false
    }
    }],
    yAxes: [{
      gridLines: {
        display: true,
        color: '#5a6386',
        zeroLineColor: '#5a6386',
        drawTicks: false
      },
      ticks: {
        fontColor: 'white',
        display: true,
        stepSize: 50000,
        padding: 15,
        callback: function(value, index, values) {
            if(value<0) {
              return value / 10000;
            }
            return `${values[index] / 1000}k`;
        }
      }
  }]
  }
}