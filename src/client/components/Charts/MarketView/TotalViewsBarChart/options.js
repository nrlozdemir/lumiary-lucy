export const barDataOptions = {
  legend: {
    display: false,
  },
  plugins: {
    datalabels: false,
  },
  hover: { mode: null },
  scales: {
    xAxes: [
      {
        barThickness: 56,
        stacked: true,
        ticks: {
          fontColor: '#fff',
          fontSize: 12,
          fontFamily: 'ClanOTNews',
          padding: 16,
          beginAtZero: true,
          callback: function(value, index, values) {
            return value
          },
        },
        gridLines: {
          display: false,
          color: '#5a6386',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: true,
          offsetGridLines: true,
          zeroLineColor: '#5a6386',
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          stepSize: 25,
          beginAtZero: true,
          fontColor: '#fff',
          fontSize: 12,
          fontFamily: 'ClanOTNews',
          padding: 16,
          beginAtZero: true,
          min: 0,
          max: 100, // Your absolute max value
          callback: function(value) {
            return ((value / 100) * 100).toFixed(0) + '%' // convert it to percentage
          },
        },
        gridLines: {
          display: true,
          color: '#5a6386',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: false,
        },
      },
    ],
  },
  chartArea: {
    backgroundColor: '#242b49',
  },
}
