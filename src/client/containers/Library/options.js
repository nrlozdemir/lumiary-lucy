const pieData = () => ({
	labels: ["Grey", "Tealish", "Hard Grey", "Hi"],
	datasets: [
		{
			data: [
				Math.floor(Math.random() * 101),
				Math.floor(Math.random() * 101),
				Math.floor(Math.random() * 101),
				Math.floor(Math.random() * 101)
			],
			backgroundColor: ["#eaeaea", "#1fbad2", "#6c6c6c", "#18212f"],
			hoverBackgroundColor: ["#eaeaea", "#1fbad2", "#6c6c6c", "#18212f"]
		}
	]
});

const barChart = [
	{ data: [50], avarage: 60, label: ["1M Views"] },
	{ data: [70], avarage: 30, label: ["60k Likes"] },
	{
		data: [60],
		avarage: 70,
		label: ["123K Shares"],
		yLabels: ["1M", "500K", "100K", "80K", "60K", "40K", "10K", "0"]
	}
];
const barChartCompare = [
	{ data: [[40], [60]], avarage: 20, label: ["1M Views", "1m"] },
	{ data: [[80], [70]], avarage: 80, label: ["60k Likes"] },
	{
		data: [[90], [60]],
		avarage: 40,
		label: ["123K Shares"],
		yLabels: ["1M", "500K", "100K", "80K", "60K", "40K", "10K", "0"]
	}
];

const videoTabsDataCompare = [
	{
		tabName: "Frames Per Second",
		avarageTitle: "82 % Industry average",
		url: "frames-per-second",
		headingOne: "24 FPS",
		headingTwo: "30 FPS",
		dataOne: "77%",
		dataTwo: "66%",
		legendOne: "77% of your videos",
		legendTwo: "66% of your videos",
		left: "40%",
		right: "40%",
		difference: "11% diference"
	},
	{
		tabName: "Number of Frames",
		avarageTitle: "69 % Industry average",
		url: "number-of-frames",
		headingOne: "73829 frames",
		headingTwo: "12921 frames",
		dataOne: "18%",
		dataTwo: "83%",
		legendOne: "18% of your videos",
		legendTwo: "83% of your videos",
		left: "30%",
		right: "30%",
		difference: "65% diference"
	},
	{
		tabName: "Scenes",
		avarageTitle: "65 % Industry average",
		url: "scenes",
		headingOne: "4 scenes",
		headingTwo: "5 scenes",
		dataOne: "43%",
		dataTwo: "90%",
		legendOne: "43% of your videos",
		legendTwo: "90% of your videos",
		left: "40%",
		right: "40%",
		difference: "57% diference"
	},
	{
		tabName: "Aspect Ratio",
		avarageTitle: "61 % Industry average",
		url: "aspect-ratio",
		headingOne: "16:9",
		headingTwo: "Other (330x250)",
		dataOne: "75%",
		dataTwo: "12%",
		legendOne: "75% of your videos",
		legendTwo: "12% of your videos",
		left: "30%",
		right: "30%",
		difference: "63% diference"
	},
	{
		tabName: "Duration",
		avarageTitle: "61 % of Industry",
		averageDesc: "(3-5’ range)",
		avarageTitleTwo: "76 % of Industry",
		averageTwoDesc: "(1-2’ range)",
		url: "duration",
		headingOne: '03:20"',
		headingTwo: "02:00”",
		dataOne: "15%",
		dataTwo: "51%",
		legendOne: "15% of your videos",
		legendTwo: "51% of your videos",
		left: "28%",
		right: "37.5%",
		difference: "36% diference"
	},
	{
		tabName: "Color Tone",
		avarageTitleTwo: "50 % of Industry",
		averageDesc: "Vibrant - Cool",
		averageTwoDesc: "Dull - Cool",
		avarageTitle: "32 % of Industry",
		url: "color-tone",
		headingOne: "Vibrant - Cool",
		headingTwo: "Dull - Cool",
		dataOne: "82%",
		dataTwo: "5%",
		legendOne: "82% of your videos",
		legendTwo: "5% of your videos",
		left: "18%",
		right: "25%",
		difference: "74% diference"
	},
	{
		tabName: "Age Range & Gender",
		avarageTitleTwo: "59 % of Industry",
		averageDesc: "Mostly Young Males",
		averageTwoDesc: "All Middle Aged Males",
		avarageTitle: "29 % of Industry",
		headingOne: "Mostly Young Males",
		headingTwo: "All Middle Aged Males",
		dataOne: "62%",
		dataTwo: "25%",
		legendOne: "62% of your videos",
		legendTwo: "25% of your videos",
		left: "30%",
		right: "12.5%",
		difference: "38% diference"
	}
];
const lineData = {
	labels: [
		"1Q16",
		"2Q16",
		"3Q16",
		"4Q16",
		"5Q16",
		"6Q16",
		"7Q16",
		"8Q16",
		"9Q16"
	],
	datasets: [
		{
			label: "My First dataset",
			fill: false,
			lineTension: 0.4,
			backgroundColor: "rgba(255,0,0,0.3)",
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
			data: [65, 59, 80, 81, 86, 35, 43, 59, 80, 81, 86]
		},
		{
			label: "second dataset	",
			fill: false,
			lineTension: 0.4,
			backgroundColor: "rgba(255,0,0,0.3)",
			borderColor: "rgba(255,255,255,1)",
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
			data: [65, 59, 21, 66, 44, 12, 23, 39, 80, 81, 86]
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

const videoTabsDataBottom = [
	{
		tabName: "Frames Per Second",
		avarageTitle: "60 FPS",
		value: 19,
		legendTitle: "19% of your videos",
		url: "frames-per-second"
	},
	{
		tabName: "Duration",
		avarageTitle: "02:10”",
		value: 4,
		legendTitle: "4% of your videos",
		legendSecondTitle: "(3-5’ range)",
		url: "duration"
	},
	{
		tabName: "Aspect Ratio",
		avarageTitle: "10:9",
		value: 32,
		legendTitle: "32% of your videos",
		url: "aspect-ratio"
	},
	{
		tabName: "Number of Frames",
		avarageTitle: "9321",
		value: 50,
		legendTitle: "50 % of your videos",
		url: "number-of-frames"
	},
	{
		tabName: "Scenes",
		avarageTitle: "4 Total",
		value: 78,
		legendTitle: "78% of your videos",
		url: "scenes"
	}
];

const videos = [
	{
		poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
		id: "lumascape4",
		video: "//media.quickframe.com/video/video/13433.mp4"
	},
	{
		poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
		id: "lumascape12",
		video: "//media.quickframe.com/video/video/15991.mp4"
	},
	{
		poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
		id: "lumascape1",
		video: "//media.quickframe.com/video/video/7485.mp4"
	},
	{
		poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
		id: "kumascape3",
		video: "//media.quickframe.com/video/video/6324.mp4"
	}
];
export {
	lineData,
	lineWithCustomLabel,
	pieData,
	videoTabsData,
	barChart,
	barChartCompare,
	videoTabsDataCompare,
	videoTabsDataBottom,
	videos
};
