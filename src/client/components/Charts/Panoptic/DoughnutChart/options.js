export const doughnutOptions = {
	responsive: true,
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
		datalabels: {
			formatter: (value, ctx) => {

				let sum = 0;
				let dataArr = ctx.chart.data.datasets[0].data;
				dataArr.map(data => {
					sum += data;
				});
				let percentage = ( value * 100 / sum ).toFixed(0) + "%";
				return percentage;
			},
			color: '#fff',
		}
	},
	elements: {
		arc: {
			borderWidth: 5
		}
	}
};
