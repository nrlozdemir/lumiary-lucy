export const barData = {
	labels: [ 'Week 1', 'Week 2', 'Week 3', 'Week 4' ],
	datasets: [
		{
			label: 'Barstool Sports',
			backgroundColor: '#51adc0',
			borderColor: '#51adc0',
			borderWidth: 1,
			data: [ 10, 3, 5, 1 ]
		},
		{
			label: 'SB Nation',
			backgroundColor: '#8567f0',
			borderColor: '#8567f0',
			borderWidth: 1,
			data: [ 12, 13, 2, 5 ]
		},
		{
			label: 'ESPN',
			backgroundColor: '#ff556f',
			borderColor: '#ff556f',
			borderWidth: 1,
			data: [ 4, 5, 4, 2 ]
		},
		{
			label: 'Scout Media',
			backgroundColor: '#acb0be',
			borderColor: '#acb0be',
			borderWidth: 1,
			data: [ 9, 8, 1, 4 ]
		},
		{
			label: 'Fansided',
			backgroundColor: '#5a6386',
			borderColor: '#5a6386',
			borderWidth: 1,
			data: [ 9, 8, 1, 4 ]
		}
	]
};

export const barDataOptions = {
	legend: {
		display: false
	},
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: '#5a6386',
					zeroLineColor: '#5a6386'
				},
				ticks: {
					fontColor: 'white'
				},
				stacked: true
			}
		],
		yAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: '#5a6386',
					zeroLineColor: '#5a6386'
				},
				ticks: {
					beginAtZero: true,
					fontColor: 'white',
					min: 0,
					max: 100, // Your absolute max value
					callback: function(value) {
						return (value / 100 * 100).toFixed(0) + '%'; // convert it to percentage
					}
				},
				stacked: true
			}
		]
	}
};

export const barDurationData = {
	labels: [ '0-15s', '16-30s', '31-60s', '61s+' ],
	datasets: [
		{
			label: 'Barstool Sports',
			backgroundColor: '#51adc0',
			borderColor: '#51adc0',
			borderWidth: 1,
			data: [ 10, 3, 5, 1 ]
		},
		{
			label: 'SB Nation',
			backgroundColor: '#8567f0',
			borderColor: '#8567f0',
			borderWidth: 1,
			data: [ 12, 13, 2, 5 ]
		},
		{
			label: 'ESPN',
			backgroundColor: '#ff556f',
			borderColor: '#ff556f',
			borderWidth: 1,
			data: [ 4, 5, 4, 2 ]
		},
		{
			label: 'Scout Media',
			backgroundColor: '#acb0be',
			borderColor: '#acb0be',
			borderWidth: 1,
			data: [ 9, 8, 1, 4 ]
		},
		{
			label: 'Fansided',
			backgroundColor: '#5a6386',
			borderColor: '#5a6386',
			borderWidth: 1,
			data: [ 9, 8, 1, 4 ]
		}
	]
};

export const barDurationOptions = {
	legend: {
		display: false
	},
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					color: '#5a6386',
					zeroLineColor: '#5a6386'
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
					color: '#5a6386',
					zeroLineColor: '#5a6386'
				},
				ticks: {
					beginAtZero: true,
					fontColor: 'white'
				}
			}
		]
	}
};
