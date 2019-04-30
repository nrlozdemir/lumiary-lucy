export const barDurationData = {
	labels: ['0-15s', '16-30s', '31-60s', '61s+'],
	datasets: [
		{
			label: 'Barstool Sports',
			backgroundColor: '#2FD7C4',
			borderColor: '#2FD7C4',
			borderWidth: 1,
			data: [10, 3, 5, 1]
		},
		{
			label: 'SB Nation',
			backgroundColor: '#8562F3',
			borderColor: '#8562F3',
			borderWidth: 1,
			data: [12, 13, 2, 5]
		},
		{
			label: 'ESPN',
			backgroundColor: '#5292E5',
			borderColor: '#5292E5',
			borderWidth: 1,
			data: [4, 5, 4, 2]
		},
		{
			label: 'Scout Media',
			backgroundColor: '#acb0be',
			borderColor: '#acb0be',
			borderWidth: 1,
			data: [9, 8, 1, 4]
		},
		{
			label: 'Fansided',
			backgroundColor: '#545B79',
			borderColor: '#545B79',
			borderWidth: 1,
			data: [9, 8, 1, 4]
		}
	]
};

export const barDurationOptions = {
	legend: {
		display: false
	},
	plugins: {
		datalabels: false
	},
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: '#545B79',
					zeroLineColor: '#545B79'
				},
				ticks: {
					fontColor: 'white'
				}
			}
		],
		yAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: '#545B79',
					zeroLineColor: '#545B79'
				},
				ticks: {
					stepSize: 5,
					beginAtZero: true,
					fontColor: 'white'
				}
			}
		]
	}
};
