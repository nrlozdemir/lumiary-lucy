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
          fontFamily: 'ClanOTNews',
        },
      },
    ],
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
          fontColor: '#fff',
          fontFamily: 'ClanOTNews',
          fontSize: 12,
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
          fontColor: '#fff',
          fontFamily: 'ClanOTNews',
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
          fontFamily: 'ClanOTNews',
          fontSize: 12,
          padding: 15,
        },
      },
    ],
  },
}
