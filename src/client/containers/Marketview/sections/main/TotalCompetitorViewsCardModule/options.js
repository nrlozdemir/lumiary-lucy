export const barDurationOptions = {
  legend: {
    display: false,
  },
  plugins: {
    datalabels: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#5a6386',
          zeroLineColor: '#5a6386',
        },
        ticks: {
          fontColor: 'white',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#5a6386',
          zeroLineColor: '#5a6386',
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white',
        },
      },
    ],
  },
}
