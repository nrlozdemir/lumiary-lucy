export const doughnutOptions = {
	responsive: false,
	cutoutPercentage: 60,
	tooltips: {
		enabled: false
	},
	legend: {
		display: false
	},
	layout: {
		padding: 0
	},
	plugins: {
		datalabels: false
	}
};

export const lineChartOptions = {
	plugins: {
		datalabels: false
	},
	tooltips: {
		position: 'nearest',
		backgroundColor: '#fff',
		titleFontColor: '#242b49',
		bodyFontColor: '#242b49',
		footerFontColor: '#242b49',
		xPadding: 10,
		yPadding: 16,
		cornerRadius: 3,
		callbacks: {
			title: function(tooltipItem, data) {
				const { datasetIndex, index } = tooltipItem[0];
				if (datasetIndex === 1) {
					return `${data.datasets[datasetIndex].data[index]}% of industry is shot in 24fps`;
				} else {
					return `${data.datasets[datasetIndex].data[index]}% of frames is shot in 24fps`;
				}
			},
			label: function(tooltipItem, data) {
				return null
			}
		}
	},
	scales: {
		xAxes: [{
			gridLines: {
				display: true,
				color: '#5a6386',
				lineWidth: 0.7,
				drawBorder: true,
				drawTicks: false
			},
			ticks: {
				fontColor: "#fff",
				fontSize: 12,
				stepSize: 1,
				beginAtZero: true,
				callback: function(value, index, values) {
					return '    ' + value;
				}
			}
		}],
		yAxes: [{
			gridLines: {
				display: true,
				color: '#5a6386',
				lineWidth: 0.7,
				drawBorder: true,
				drawTicks: false
			},
			ticks: {
				fontColor: "#fff",
				fontSize: 12,
				stepSize: 25,
				beginAtZero: true,
				marginRight: 16,
				callback: function(value, index, values) {
					return value + '%      '
				}
			}
		}]
	},
};

export const selectOptions = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];
