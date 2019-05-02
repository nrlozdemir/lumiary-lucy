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
          color: '#545B79',
          zeroLineColor: '#545B79',
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
          color: '#545B79',
          zeroLineColor: '#545B79',
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white',
        },
      },
    ],
  },
}
