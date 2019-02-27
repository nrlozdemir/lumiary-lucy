export const radarChartOptions = {
	legend: {
		display: false
	},
	tooltips: {
		backgroundColor: "#fff",
		cornerRadius: 0,
		titleFontColor: "#000",
		mode: "point",
		bodyFontColor: "#000"
	},
	plugins: {
		datalabels: false
	},
	scale: {
		gridLines: {
			display: true,
			lineWidth: 10
		},
		pointLabels: {
			callback: function(value, index, values) {
				return "●";
			},
			fontSize: 16,
		},
		ticks: {
			display: false,
			maxTicksLimit: 5
		}
	}
}
