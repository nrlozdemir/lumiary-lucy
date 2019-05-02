export const barDataOptions = {
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  },
  plugins: {
    datalabels: false
  }
  ,
  layout: {
    padding: {
      left: 35,
      right: 50,
      top: 0,
      bottom: 0
    }
  },
  scales: {
    yAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          drawBorder: false,
          color: "#545B79",
          zeroLineColor: "#545B79"
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize: 25,
          callback: function(value, index, values) {
            return " ";
          }
        }
      }
    ],
    xAxes: [
      {
        display: false,
        gridLines: {
          lineWidth: 0,
          drawBorder: false,
          color: "rgba(255,255,255,0)",
          zeroLineColor: "rgba(0,0,0,0)"
        }
      }
    ]
  }
};
