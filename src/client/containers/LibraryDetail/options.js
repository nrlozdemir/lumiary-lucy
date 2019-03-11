export const barDataOptions = {
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  },
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
          color: "#5a6386",
          zeroLineColor: "#5a6386"
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

export const selectOptions = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];

export const barData_DatasetOptions = [
  {
    label: "first",
    backgroundColor: "#D0506C",
    borderColor: "#D0506C",
    borderWidth: 1,
    hoverBackgroundColor: "#D0506C",
    hoverBorderColor: "#D0506C"
  },
  {
    label: "second",
    backgroundColor: "#51adc0",
    borderColor: "#51adc0",
    borderWidth: 1,
    hoverBackgroundColor: "#51adc0",
    hoverBorderColor: "#51adc0"
  }
];

export const radarData_DatasetOptions = [
  {
    label: "My First dataset",
    backgroundColor: "rgba(255, 85, 111,0.6)",
    borderColor: "transparent",
    pointBackgroundColor: "rgb(255, 85, 111,1)",
    pointBorderColor: "transparent"
  },
  {
    label: "My Second dataset",
    backgroundColor: "rgba(81, 173, 192,0.6)",
    borderColor: "transparent",
    pointBackgroundColor: "rgba(81, 173, 192,1)",
    pointBorderColor: "transparent"
  }
];
