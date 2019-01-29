import React from "react";
import style from "./style.scss";

export const videoList = [
	"https://picsum.photos/100/160?image=1",
	"https://picsum.photos/20/160?image=2",
	"https://picsum.photos/75/160?image=3",
	"https://picsum.photos/120/160?image=4",
	"https://picsum.photos/200/160?image=5",
	"https://picsum.photos/250/160?image=6",
	"https://picsum.photos/90/160?image=7",
	"https://picsum.photos/110/160?image=8",
	"https://picsum.photos/40/160?image=9",
	"https://picsum.photos/60/160?image=10",
	"https://picsum.photos/90/160?image=11",
	"https://picsum.photos/120/160?image=12",
	"https://picsum.photos/160/160?image=13",
	"https://picsum.photos/200/160?image=14",
	"https://picsum.photos/129/160?image=15",
	"https://picsum.photos/210/160?image=16",
	"https://picsum.photos/40/160?image=17",
	"https://picsum.photos/20/160?image=18"
];
export const slideImages = [
	{
		src: "https://picsum.photos/500/270?image=1",
		options: [{ percentage: 40, accurate: 20, text: "Male" }, { percentage: 60, accurate: 60, text: "Laptop" }]
	},
	{
		src: "https://picsum.photos/500/270?image=2",
		options: [{ percentage: 30, accurate: 20, text: "Female" }, { percentage: 50, accurate: 20, text: "Cat" }]
	},
	{
		src: "https://picsum.photos/500/270?image=3",
		options: [{ percentage: 40, accurate: 10, text: "Cart" }, { percentage: 16, accurate: 30, text: "Bag" }]
	},
	{
		src: "https://picsum.photos/500/270?image=4",
		options: [{ percentage: 34, accurate: 68, text: "Playstation" }, { percentage: 30, accurate: 20, text: "Mouse" }]
	},
	{
		src: "https://picsum.photos/500/270?image=6",
		options: [{ percentage: 40, accurate: 53, text: "Male" }, { percentage: 52, accurate: 30, text: "Sheep" }]
	},
	{
		src: "https://picsum.photos/500/270?image=5",
		options: [{ percentage: 42, accurate: 20, text: "Phone" }, { percentage: 78, accurate: 60, text: "Electronics" }]
	},
	{
		src: "https://picsum.photos/500/270?image=7",
		options: [{ percentage: 40, accurate: 30, text: "Key" }, { percentage: 45, accurate: 42, text: "Press" }]
	},
	{
		src: "https://picsum.photos/500/270?image=8",
		options: [{ percentage: 31, accurate: 20, text: "Male" }, { percentage: 76, accurate: 54, text: "Laptop" }]
	}
];

export const barData = {
	labels: ["January", "February", "March", "Bla"],
	datasets: [
		{
			label: "first",
			backgroundColor: "#ff556f",
			borderColor: "#ff556f",
			borderWidth: 1,
			hoverBackgroundColor: "#ff556f",
			hoverBorderColor: "#ff556f",
			data: [54, 90, 80, 40]
		},
		{
			label: "second",
			backgroundColor: "#51adc0",
			borderColor: "#51adc0",
			borderWidth: 1,
			hoverBackgroundColor: "#51adc0",
			hoverBorderColor: "#51adc0",
			data: [65, 59, 30, 90]
		}
	]
};

export const barDataOptions = {
	tooltips: {
		enabled: false
	},
	legend: {
		display: false
	},
	layout: {
		padding: {
			left: 35,
			right: 50,
			top: 0,
			bottom: 0
		}
	},
	scales: {
		yAxes: [
			{
				display: true,
				gridLines: {
					display: true,
					drawBorder: false,
					color: "#5a6386",
					zeroLineColor: "#5a6386"
				},
				ticks: {
					min: 0,
					max: 100,
					stepSize: 25,
					callback: function(value, index, values) {
						return " ";
					}
				}
			}
		],
		xAxes: [
			{
				display: false,
				gridLines: {
					lineWidth: 0,
					drawBorder: false,
					color: "rgba(255,255,255,0)",
					zeroLineColor: "rgba(0,0,0,0)"
				}
			}
		]
	}
};
export const doughnutData = [
	{
		title: "Frame Rate",
		secondTitle: "24fps",
		average: [30, 12, 6, 52]
	},
	{
		title: "Pacing",
		secondTitle: "Fastest",
		average: [12, 15, 15, 68]
	},
	{
		title: "Shots",
		secondTitle: "12 Shots",
		average: [15, 22, 18, 45]
	},
	{
		title: "Format",
		secondTitle: "Live Action",
		average: [15, 17, 30, 48]
	}
];

export const colorTempData = [
	{
		data: [
			{x: -50, y:82, color: '#ff556f'},
			{x: 50,y:-25, color: '#51adc0'},
			{x: 75, y: -30, color: '#8567f0'},
		]
	},
	{
		data: [
			{x: -50, y:12, color: '#ff556f'},
			{x: 50,y:25, color: '#51adc0'},
			{x: 75, y: -30, color: '#8567f0'},
		]
	},
	{
		data: [
			{x: -50, y:12, color: '#ff556f'},
			{x: 50,y:-75, color: '#51adc0'},
			{x: 75, y: -30, color: '#8567f0'},
		]
	}
];

export const radarData = {
	labels: [
		"#fff20d",
		"#f8b90b",
		"#eb7919",
		"#dd501d",
		"#cc2226",
		"#b83057",
		"#923683",
		"#79609b",
		"#3178b0",
		"#229a78",
		"#13862b",
		"#aac923"
	],
	datasets: [
		{
			label: "My First dataset",
			backgroundColor: "rgba(255, 85, 111,0.6)",
			borderColor: "transparent",
			pointBackgroundColor: "rgb(255, 85, 111,1)",
			pointBorderColor: "transparent",
			data: [65, 59, 34, 81, 56, 40, 65, 59, 34, 81, 56]
		},
		{
			label: "My Second dataset",
			backgroundColor: "rgba(81, 173, 192,0.6)",
			borderColor: "transparent",
			pointBackgroundColor: "rgba(81, 173, 192,1)",
			pointBorderColor: "transparent",
			data: [28, 48, 40, 19, 96, 74, 65, 59, 34, 81, 56]
		}
	]
};

export const sliderMarks = {
	10: { label: <p className={style.dot}>0:00</p> },
	20: { label: <p className={style.dot}>0:10</p> },
	30: { label: <p className={style.dot}>0:20</p> },
	40: { label: <p className={style.dot}>0:30</p> },
	50: { label: <p className={style.dot}>0:40</p> },
	60: { label: <p className={style.dot}>0:50</p> },
	70: { label: <p className={style.dot}>0:60</p> },
	80: { label: <p className={style.dot}>0:70</p> },
	90: { label: <p className={style.dot}>0:80</p> },
	100: { label: <p className={style.dot}>0:90</p> }
};

export const selectOptions = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];

export const lineChartData =  {
	labels: [
		"1/11/2019",
		"1/12/2019",
		"1/13/2019",
		"1/14/2019",
		"1/15/2019",
		"1/16/2019",
		"1/17/2019"
	],
	datasets: [{
		fill: false,
		lineTension: 0.1,
		borderColor: "#51adc0",
		borderCapStyle: "butt",
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: "miter",
		pointRadius: 5,
		pointBackgroundColor: "#51adc0",
		pointBorderColor: "#fff",
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: "rgba(75,192,192,1)",
		pointHoverBorderColor: "rgba(220,220,220,1)",
		pointHoverBorderWidth: 2,
		pointHitRadius: 10,
		shadowOffsetX: 1,
		shadowOffsetY: 1,
		shadowBlur: 5,
		shadowColor: "#51adc0",
		data: [30, 45, 32, 58, 71, 95, 22]
	},{
		fill: false,
		lineTension: 0.1,
		borderColor: "#8567f0",
		borderCapStyle: "butt",
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: "miter",
		pointRadius: 5,
		pointBackgroundColor: "#8567f0",
		pointBorderColor: "#fff",
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: "rgba(75,192,192,1)",
		pointHoverBorderColor: "rgba(220,220,220,1)",
		pointHoverBorderWidth: 2,
		pointHitRadius: 10,
		shadowOffsetX: 1,
		shadowOffsetY: 1,
		shadowBlur: 5,
		shadowColor: "#8567f0",
		data: [14, 10 , 70, 90, 45, 55, 50]
	},
	],
	beforeDraw: function (chart, easing) {
		if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
			const ctx = chart.chart.ctx;
			const chartArea = chart.chartArea;

			ctx.save();
			ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
			ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			ctx.restore();
		}
	}
};
