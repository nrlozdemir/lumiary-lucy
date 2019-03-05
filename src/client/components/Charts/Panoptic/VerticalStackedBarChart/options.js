export const stackedChartOptions = {
	titleFontColor: '#242b49',
	bodyFontColor: '#242b49',
	footerFontColor: '#242b49',
	title: {
		display: true,
	},
	legend: {
		display: false
	},
	tooltips: {
		mode: 'index',
		intersect: false
	},
	responsive: true,
	scales: {
		xAxes: [{
      barThickness: 56,
			stacked: true,
			ticks: {
				fontColor: "#fff",
				fontSize: 12,
				stepSize: 1,
				beginAtZero: true,
				callback: function(value, index, values) {
					return value ;
				}
			}
		}],
		yAxes: [{
			stacked: true,
			ticks: {
				fontColor: "#fff",
				fontSize: 12,
				stepSize: 25,
				beginAtZero: true,
				callback: function(value, index, values) {
					return value + '%';
				}
			}
		}]
	},
	chartArea: {
		backgroundColor: '#fff',
	},
	plugins: {
		datalabels: false
	}
};
