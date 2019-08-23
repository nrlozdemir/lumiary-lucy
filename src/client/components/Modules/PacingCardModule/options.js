export const barChartOptions = {
	responsive: false,
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
        barThickness: 40,
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
