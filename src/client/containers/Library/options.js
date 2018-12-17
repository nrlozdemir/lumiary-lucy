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

const versus = {
	male: {
		versus1: [
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			}
		],
		versus2: [
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			}
		],
		versus3: [
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			}
		]
	},
	female: {
		versus1: [
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},

			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			}
		],
		versus2: [
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			},
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			}
		],
		versus3: [
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13430.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/13436.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/13432.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/13433.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				diff: "97"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15993.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/15995.mp4"
				},
				diff: "38"
			},
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				diff: "76"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/7480.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				diff: "67"
			}
		]
	}
};
const platformSocialMediaVideoList = {
	"qf-iconFacebook": {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "24 FPS",
				value: 40,
				legendTitle: "40% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "00:10”",
				value: 50,
				legendTitle: "50% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "12:8",
				value: 76,
				legendTitle: "76% of your videos",
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	"qf-iconInstagram": {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "24 FPS",
				value: 24,
				legendTitle: "24% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "03:50”",
				value: 97,
				legendTitle: "97% of your videos",
				legendSecondTitle: "(7-10’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 90,
				legendTitle: "90% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "2356",
				value: 85,
				legendTitle: "85 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "10 Total",
				value: 30,
				legendTitle: "30% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	"qf-iconSnapchat": {
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	"qf-iconTwitter": {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "10 FPS",
				value: 22,
				legendTitle: "22% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 92,
				legendTitle: "92% of your videos",
				legendSecondTitle: "(1-2’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "2:4",
				value: 60,
				legendTitle: "60% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "1252",
				value: 20,
				legendTitle: "20 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "41 Total",
				value: 16,
				legendTitle: "16% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			}
		]
	},
	"qf-iconYotube": {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 34,
				legendTitle: "34% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 40,
				legendTitle: "40% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 56,
				legendTitle: "56% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 71,
				legendTitle: "71 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 65,
				legendTitle: "65% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	Sunday: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "24 FPS",
				value: 40,
				legendTitle: "40% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "00:10”",
				value: 50,
				legendTitle: "50% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "12:8",
				value: 76,
				legendTitle: "76% of your videos",
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Saturday: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "24 FPS",
				value: 24,
				legendTitle: "24% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "03:50”",
				value: 97,
				legendTitle: "97% of your videos",
				legendSecondTitle: "(7-10’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 90,
				legendTitle: "90% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "2356",
				value: 85,
				legendTitle: "85 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "10 Total",
				value: 30,
				legendTitle: "30% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	Friday: {
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Thursday: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "10 FPS",
				value: 22,
				legendTitle: "22% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 92,
				legendTitle: "92% of your videos",
				legendSecondTitle: "(1-2’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "2:4",
				value: 60,
				legendTitle: "60% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "1252",
				value: 20,
				legendTitle: "20 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "41 Total",
				value: 16,
				legendTitle: "16% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			}
		]
	},
	Wednesday: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 34,
				legendTitle: "34% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 40,
				legendTitle: "40% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 56,
				legendTitle: "56% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 71,
				legendTitle: "71 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 65,
				legendTitle: "65% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	Tuesday: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "10 FPS",
				value: 22,
				legendTitle: "22% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 92,
				legendTitle: "92% of your videos",
				legendSecondTitle: "(1-2’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "2:4",
				value: 60,
				legendTitle: "60% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "1252",
				value: 20,
				legendTitle: "20 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "41 Total",
				value: 16,
				legendTitle: "16% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			}
		]
	},
	Monday: {
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Education: {
		name: "Education",
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	DirectResponse: {
		name: "Direct Response",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 89,
				legendTitle: "89% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 24,
				legendTitle: "24% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 52,
				legendTitle: "52% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 25,
				legendTitle: "25 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 14,
				legendTitle: "14% of your videos",
				url: "scenes"
			}
		],
		videoList: [
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Awareness: {
		name: "Awareness",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "30 FPS",
				value: 42,
				legendTitle: "42% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "10:10”",
				value: 86,
				legendTitle: "86% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "4:8",
				value: 12,
				legendTitle: "12% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "100",
				value: 92,
				legendTitle: "92 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "20 Total",
				value: 30,
				legendTitle: "30% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	one: {
		name: "13-18",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "10 FPS",
				value: 22,
				legendTitle: "22% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 92,
				legendTitle: "92% of your videos",
				legendSecondTitle: "(1-2’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "2:4",
				value: 60,
				legendTitle: "60% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "1252",
				value: 20,
				legendTitle: "20 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "41 Total",
				value: 16,
				legendTitle: "16% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			}
		]
	},
	two: {
		name: "18-21",
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	three: {
		name: "21-23",
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	four: {
		name: "23-28",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 89,
				legendTitle: "89% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 24,
				legendTitle: "24% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 52,
				legendTitle: "52% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 25,
				legendTitle: "25 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 14,
				legendTitle: "14% of your videos",
				url: "scenes"
			}
		],
		videoList: [
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	five: {
		name: "28-31",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "30 FPS",
				value: 42,
				legendTitle: "42% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "10:10”",
				value: 86,
				legendTitle: "86% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "4:8",
				value: 12,
				legendTitle: "12% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "100",
				value: 92,
				legendTitle: "92 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "20 Total",
				value: 30,
				legendTitle: "30% of your videos",
				url: "scenes"
			}
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			},
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			}
		]
	},
	seven: {
		name: "35-38",
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	six: {
		name: "31-35",
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 89,
				legendTitle: "89% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 24,
				legendTitle: "24% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 52,
				legendTitle: "52% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 25,
				legendTitle: "25 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 14,
				legendTitle: "14% of your videos",
				url: "scenes"
			}
		],
		videoList: [
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Female: {
		name: "35-38",
		videoTabsData: [
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
		],
		videoList: [
			{
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
				id: "lumascape12",
				video: "//media.quickframe.com/video/video/15991.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
				id: "lumascape4",
				video: "//media.quickframe.com/video/video/13433.mp4"
			},

			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	},
	Male: {
		videoTabsData: [
			{
				tabName: "Frames Per Second",
				avarageTitle: "60 FPS",
				value: 89,
				legendTitle: "89% of your videos",
				url: "frames-per-second"
			},
			{
				tabName: "Duration",
				avarageTitle: "02:10”",
				value: 24,
				legendTitle: "24% of your videos",
				legendSecondTitle: "(3-5’ range)",
				url: "duration"
			},
			{
				tabName: "Aspect Ratio",
				avarageTitle: "10:9",
				value: 52,
				legendTitle: "52% of your videos",
				url: "aspect-ratio"
			},
			{
				tabName: "Number of Frames",
				avarageTitle: "9321",
				value: 25,
				legendTitle: "25 % of your videos",
				url: "number-of-frames"
			},
			{
				tabName: "Scenes",
				avarageTitle: "4 Total",
				value: 14,
				legendTitle: "14% of your videos",
				url: "scenes"
			}
		],
		videoList: [
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
				poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
				id: "kumascape3",
				video: "//media.quickframe.com/video/video/6324.mp4"
			},
			{
				poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
				id: "lumascape1",
				video: "//media.quickframe.com/video/video/7485.mp4"
			}
		]
	}
};
const viewsVideos = {
	one: [
		{
			id: "facebook",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascap546e1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape984",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascap856e1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc14ape3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc6ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasc64586ape12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasca2354pe12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				}
			]
		},
		{
			id: "instagram",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape11242",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape6344",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3123",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape351",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape15232",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape2344",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1231",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3453",
					video: "//media.quickframe.com/video/video/15992.mp4"
				}
			]
		},
		{
			id: "snapchat",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape2341",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascap456546e4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascap5345e12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascap234e12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape763",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascap47e4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasca12356pe1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascap76586e3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				}
			]
		},
		{
			id: "youtube",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascap5345e4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascap123e1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3123",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape123214",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasca346pe12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc123123ape3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc123123ape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc124213ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				}
			]
		},
		{
			id: "twitter",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lum4123ascape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "luma12312scape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascap123e1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape1231234",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape11231232",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape1324232",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascap45e3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascap456e3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				}
			]
		},
		{
			id: "pinterest",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasca235234pe4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc346345ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascap2452345e12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape325453",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape12634645",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape162354",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape33425345",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape124234",
					video: "//media.quickframe.com/video/video/15991.mp4"
				}
			]
		}
	],
	two: [
		{
			id: "facebook",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape41",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape57",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape342",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4354",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape456344",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape16535462",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape13655462",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape33465546",
					video: "//media.quickframe.com/video/video/6324.mp4"
				}
			]
		},
		{
			id: "instagram",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12342",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascap5324e4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascap436546e4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasca234235pe12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasca234235pe3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasca23423532pe1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc4235ape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				}
			]
		},
		{
			id: "snapchat",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasca234235pe12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasc234235ape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc234235324ape3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc234235ape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc243423ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumas4234234cape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumas234234cape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc5234234ape3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				}
			]
		},
		{
			id: "youtube",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "luma234234scape12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasca324234pe12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "4234324",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumas324235cape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc234325ape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumas5234234cape3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc234234ape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc5234234ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				}
			]
		},
		{
			id: "twitter",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasca234235pe4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape2342352312",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc154124ape3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascap235324e3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape42342312",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc345ape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasca345345pe4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasca345435pe1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				}
			]
		},
		{
			id: "pinterest",
			data: [
				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumas123123cape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumasc345345ape3",
					video: "//media.quickframe.com/video/video/15992.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumasc345346ape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumas123cape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasc325234ape12",
					video: "//media.quickframe.com/video/video/13450.mp4"
				},
				{
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumas234234cape3",
					video: "//media.quickframe.com/video/video/6324.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumasc124123ape1",
					video: "//media.quickframe.com/video/video/16000.mp4"
				},

				{
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumasc123123pe12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				}
			]
		}
	]
};
export {
	lineData,
	lineWithCustomLabel,
	pieData,
	videoTabsData,
	barChart,
	barChartCompare,
	videoTabsDataCompare,
	videoTabsDataBottom,
	videos,
	versus,
	platformSocialMediaVideoList,
	viewsVideos
};
