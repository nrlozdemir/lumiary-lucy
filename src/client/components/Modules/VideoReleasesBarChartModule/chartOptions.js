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
      title: function (tooltipItem, data) {
        if (tooltipItem[0].yLabel < 0) {
          return `${Math.abs(tooltipItem[0].yLabel / 1000)}k Engagement`
        }
        return `${Math.abs(tooltipItem[0].yLabel / 10000)} Videos`
      },
      label: function () {
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
					fontSize: 12,
          fontColor: '#fff',
					fontFamily: "ClanOTNews",
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
          fontColor: '#fff',
					fontFamily: "ClanOTNews",
					fontSize: 12,
        },
      },
    ],
  },
}

export const wrapperBarOptions = (data) => ({
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
  chartArea: {
    backgroundColor: '#21243B',
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
          fontColor: '#fff',
					fontFamily: "ClanOTNews",
					fontSize: 12,
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
          display: true,
          fontColor: '#fff',
					fontFamily: "ClanOTNews",
					fontSize: 12,
          stepSize: 50000,
          padding: 15,
          callback: function (value, index, values) {
            if (value == 0) {
              return 0
            }
            if (value < 0) {
              return `${Math.abs(value / 1000)}k`
            }
            return `${values[index] / 10000}v`
          },
        },
      },
    ],
  }
})
