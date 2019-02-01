export const barData = {
	labels: ["Live Action", "Stop Motion", "Cinemagraph", "Animation"],
	datasets: [
		{
			label: "Slowest",
			backgroundColor: "#51adc0",
			borderColor: "#51adc0",
			borderWidth: 1,
			data: [10, 3, 5, 1]
		},
		{
			label: "Slow",
			backgroundColor: "#8567f0",
			borderColor: "#8567f0",
			borderWidth: 1,
			data: [12, 13, 2, 5]
		},
		{
			label: "Medium",
			backgroundColor: "#ff556f",
			borderColor: "#ff556f",
			borderWidth: 1,
			data: [4, 5, 4, 2]
		},
		{
			label: "Fast",
			backgroundColor: "#acb0be",
			borderColor: "#acb0be",
			borderWidth: 1,
			data: [9, 8, 1, 4]
		}
	]
};

export const barDataOptions = {
	legend: {
		display: false
	},
	scales: {
		yAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: "#5a6386",
					zeroLineColor: "#5a6386"
				},
				ticks: {
					fontColor: "white"
				},
				stacked: true
			}
		],
		xAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: "#5a6386",
					zeroLineColor: "#5a6386"
				},
				ticks: {
					beginAtZero: true,
					fontColor: "white",
					min: 0,
					max: 100, // Your absolute max value
					callback: function(value) {
						return ((value / 100) * 100).toFixed(0) + "%"; // convert it to percentage
					}
				},
				stacked: true
			}
		]
	}
};
