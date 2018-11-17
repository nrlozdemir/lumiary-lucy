const pieData = {
	labels: ["Red", "Green", "Yellow"],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
		}
	]
};
const lineData = {
	labels: [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"10",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20"
	],
	datasets: [
		{
			label: "My First dataset",
			fill: false,
			lineTension: 0.4,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 20,
			data: [
				65,
				59,
				80,
				81,
				86,
				35,
				43,
				59,
				80,
				81,
				86,
				35,
				43,
				15,
				13,
				34,
				81,
				56,
				55,
				40,
				35,
				43,
				15,
				29,
				80,
				81
			]
		}
	]
};
const lineWithCustomLabel = {
	labels: [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"10",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20"
	],
	datasets: [
		{
			label: "a",
			fill: false,
			lineTension: 0.4,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 20,
			datalabels: {
				display: false
			},
			data: [
				65,
				59,
				80,
				81,
				86,
				35,
				43,
				59,
				80,
				81,
				86,
				35,
				43,
				15,
				12,
				NaN,
				81,
				56,
				55,
				40,
				35,
				43,
				15,
				29,
				80,
				81
			]
		},
		{
			label: "b",
			fill: false,
			lineTension: 0.4,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [10, 5],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 0,
			pointHoverRadius: 0,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 0,
			pointRadius: 1,
			pointHitRadius: 20,
			datalabels: {
				align: "start",
				anchor: "start"
			},
			data: [
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				12,
				32,
				81,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN,
				NaN
			]
		}
	]
};

const videoTabsData = [
	{
		tabName: "Frames Per Second",
		secondTitle: "24 FPS this video",
		avarage: 82,
		avarageTitle: "82 % Industry average",
		value: 77,
		legendTitle: "77% of your videos",
		url: "frames-per-second"
	},
	{
		tabName: "Duration",
		secondTitle: "03:20” this video",
		avarage: 74,
		avarageTitle: "74 % Industry average",
		avarageSecondTitle: "(3-5’ range)",
		value: 54,
		legendTitle: "54% of your videos",
		legendSecondTitle: "(3-5’ range)",
		url: "duration"
	},
	{
		tabName: "Aspect Ratio",
		secondTitle: "16:9 this video",
		avarage: 77,
		avarageTitle: "77 % Industry average",
		value: 39,
		legendTitle: "39% of your videos",
		url: "aspect-ratio"
	},
	{
		tabName: "Number of Frames",
		secondTitle: "73829 frames",
		avarage: 69,
		avarageTitle: "69 % Industry average",
		value: 18,
		legendTitle: "18% of your videos",
		url: "number-of-frames"
	},
	{
		tabName: "Scenes",
		secondTitle: "4 scenes this video",
		avarage: 65,
		avarageTitle: "65 % Industry average",
		value: 6,
		legendTitle: "6% of your videos",
		url: "scenes"
	}
];

export { lineData, lineWithCustomLabel, pieData, videoTabsData };
