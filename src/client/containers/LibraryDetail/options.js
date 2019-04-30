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

export const selectOptions = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];

export const barData_DatasetOptions = [
  {
    label: "first",
    backgroundColor: "#5292E5",
    borderColor: "#5292E5",
    borderWidth: 1,
    hoverBackgroundColor: "#5292E5",
    hoverBorderColor: "#5292E5"
  },
  {
    label: "second",
    backgroundColor: "#2FD7C4",
    borderColor: "#2FD7C4",
    borderWidth: 1,
    hoverBackgroundColor: "#2FD7C4",
    hoverBorderColor: "#2FD7C4"
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
