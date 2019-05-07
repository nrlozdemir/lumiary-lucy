export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  legend: {
    display: false,
  },
  tooltips: {
    position: 'nearest',
    backgroundColor: '#fff',
    titleFontColor: '#21243B',
    titleMarginBottom: 0,
    bodyFontColor: '#21243B',
    footerFontColor: '#21243B',
    xPadding: 30,
    yPadding: 15,
    callbacks: {
      title: function(tooltipItem, data) {
        if (tooltipItem[0].yLabel < 0) {
          return `${Math.abs(tooltipItem[0].yLabel / 1000)}k Engagement`
        }
        return `${Math.abs(tooltipItem[0].yLabel / 10000)} Videos`
      },
      label: function() {
        return null
      },
    },
  },
  plugins: {
    datalabels: false,
  },
  scales: {
    xAxes: [
      {
        barThickness: 10,
        stacked: true,
        gridLines: {
          display: false,
          tickMarkLength: 15,
        },
        ticks: {
          fontColor: 'white',
        },
      },
    ],
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    yAxes: [
      {
        stacked: false,
        display: false,
        gridLines: {
          display: false,
          tickMarkLength: 0,
        },
        ticks: {
          display: false,
          stepSize: 50000,
        },
      },
    ],
  },
}

export const wrapperBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  legend: {
    display: false,
  },
  plugins: {
    datalabels: false,
  },

  scales: {
    xAxes: [
      {
        barThickness: 0,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: '#545B79',
          zeroLineColor: '#ffffff',
          drawTicks: false,
        },
        ticks: {
          fontColor: 'white',
          display: true,
          stepSize: 50000,
          padding: 15,
          callback: function(value, index, values) {
            if (value == 0) {
              return 0
            }
            const val = Math.abs(value / 1000)
            const val2 = values[index] / 10000

            if (value < 0) {
              return val === 100 ? `${val}k` : ''
            }
            return val2 === 10 ? `${val2}v` : ''
          },
        },
      },
    ],
  },
}
