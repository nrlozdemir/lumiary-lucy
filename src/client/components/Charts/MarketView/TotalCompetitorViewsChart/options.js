export const barDurationOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
        maxBarThickness: 30,
        barThickness: 32,
        ticks: {
          fontColor: '#fff',
          fontSize: 12,
          fontFamily: 'ClanOTNews',
          padding: 16,
        },
        gridLines: {
          display: true,
          color: '#5a6386',
          lineWidth: 1,
          drawBorder: true,
          drawTicks: false,
          offsetGridLines: true,
          zeroLineColor: '#5a6386',
          tickMarkLength: 10,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          stepSize: 5,
          beginAtZero: true,
          fontColor: '#fff',
          fontSize: 12,
          fontFamily: 'ClanOTNews',
          padding: 16,
          min: 0,
          max: 20, // Your absolute max value
          callback: function(value, index, values) {
            return value === 0 ? 0 : `${value}m`
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
