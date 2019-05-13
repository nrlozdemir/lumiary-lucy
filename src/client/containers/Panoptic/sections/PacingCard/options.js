export const barChartOptions = {
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
    yAxes: [
      {
        display: true,
        gridLines: {
          display: false,
          color: '#545B79',
          zeroLineColor: '#545B79',
          drawTicks: false,
        },
        ticks: {
          fontColor: 'white',
          fontFamily: 'ClanOTNews',
          fontSize: 12,
          padding: 15,
        },
        barThickness: 30,
        stacked: true,
      },
    ],
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#545B79',
          zeroLineColor: '#545B79',
          drawTicks: false,
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white',
          fontFamily: 'ClanOTNews',
          fontSize: 12,
          padding: 15,
          min: 0,
          max: 100, // Your absolute max value
          stepSize: 25,
          callback: function(value) {
            return ((value / 100) * 100).toFixed(0) + '%' // convert it to percentage
          },
        },
        stacked: true,
      },
    ],
  },
}
export const horizontalStackedBarData_DatasetOptions = [
  {
    label: 'Slowest',
    backgroundColor: '#2FD7C4',
    borderColor: '#2FD7C4',
    borderWidth: 1,
  },
  {
    label: 'Slow',
    backgroundColor: '#8562F3',
    borderColor: '#8562F3',
    borderWidth: 1,
  },
  {
    label: 'Medium',
    backgroundColor: '#5292E5',
    borderColor: '#5292E5',
    borderWidth: 1,
  },
  {
    label: 'Fast',
    backgroundColor: '#acb0be',
    borderColor: '#acb0be',
    borderWidth: 1,
  },
]

export const stadiumData_DatasetOptions = [
  {
    color: '#2FD7C4',
    title: 'Slowest',
  },
  {
    color: '#8562F3',
    title: 'Slow',
  },
  {
    color: '#5292E5',
    title: 'Medium',
  },
  {
    color: '#ACB0BE',
    title: 'Fast',
  },
]
