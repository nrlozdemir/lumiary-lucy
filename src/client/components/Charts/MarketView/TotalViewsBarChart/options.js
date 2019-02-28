export const barDataOptions = {
  legend: {
    display: false
  },
  plugins: {
    datalabels: false
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#5a6386',
          zeroLineColor: '#5a6386'
        },
        ticks: {
          fontColor: 'white'
        },
        stacked: true
      }
    ],
    yAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#5a6386',
          zeroLineColor: '#5a6386'
        },
        ticks: {
          beginAtZero: true,
          fontColor: 'white',
          min: 0,
          max: 100, // Your absolute max value
          callback: function (value) {
            return (value / 100 * 100).toFixed(0) + '%'; // convert it to percentage
          }
        },
        stacked: true
      }
    ]
  }
};
