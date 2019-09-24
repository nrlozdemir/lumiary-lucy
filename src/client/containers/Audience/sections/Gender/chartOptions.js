export const barChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
  },
  plugins: {
    datalabels: false,
  },
  chartArea: {
    backgroundColor: '#21243B',
  },
  tooltips: {
    callbacks: {
      label: function(t, d) {
        const label = d.datasets[t.datasetIndex].label
        const percentage = Math.abs(t.xLabel)
        return label + ': ' + percentage + '%'
      },
    },
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        display: true,
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          padding: 20,
        },
        stacked: true,
        barThickness: 15,
      },
    ],
    xAxes: [
      {
        padding: 10,
        display: true,
        gridLines: {
          display: true,
          color: '#545B79',
          zeroLineColor: '#545B79',
          drawTicks: false,
        },
        ticks: {
          fontColor: 'white',
          padding: 20,
          stepSize: 50,
          min: -100,
          max: 100,
          beginAtZero: true,
          callback: function(value) {
            return Math.abs(value) + '%'
          },
        },
        stacked: true,
      },
    ],
  },
}
