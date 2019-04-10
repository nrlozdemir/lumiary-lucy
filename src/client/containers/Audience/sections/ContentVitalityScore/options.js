export const lineChartOptions = {
	responsive: true,
  plugins: {
		datalabels: false,
		filler: {
			propagate: true
		}
	},
	elements: {
		point:{
			radius: 0
		}
	},
  tooltips: {
		enabled: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: true,
        color: '#5a6386',
        lineWidth: 0.7,
        drawBorder: false,
				beginAtZero: true,
        drawTicks: false
      },
      ticks: {
        fontColor: "#fff",
				fontFamily: "ClanOTNews",
        fontSize: 14,
        stepSize: 1,
				beginAtZero: true,
				padding: 20,
        callback: function(value, index, values) {
          return value
        }
      }
    }],
    yAxes: [{
      gridLines: {
        display: true,
        color: '#5a6386',
        lineWidth: 0.7,
        drawBorder: false,
        drawTicks: false
      },
      ticks: {
				fontColor: "#fff",
				fontFamily: "ClanOTNews",
				fontSize: 14,
				max: 250,
        stepSize: 50,
				beginAtZero: true,
				padding: 20,
        marginRight: 16,
        callback: function(value, index, values) {
					if(value == 0 || value == 250){
						return value
					}
					else{
						return ''
					}
        }
      }
    }]
  },
};

export const lineChartData_DatasetOptions = [
  {
    fill: true,
		backgroundColor: "rgba(220, 118, 149, 0.6)"
  },
  {
		fill: true,
		backgroundColor: "rgba(163, 137, 255, 0.6)"
  },
  {
		fill: true,
		backgroundColor: "rgba(126, 206, 218, 0.6)"
  }
];
