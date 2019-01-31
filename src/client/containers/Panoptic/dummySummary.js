import { Doughnut } from "react-chartjs-2";
import React from "react";

const dummySummary = [
  { description: 'Video Views', title: '7.64m'},
  { description: 'Engagement Rate', title: '53%'},
  { description: 'Completion Rate', title: '29%'}
];

export const selectOptions = [
	{ value: "chocolate", label: "Chocolate" },
	{ value: "strawberry", label: "Strawberry" },
	{ value: "vanilla", label: "Vanilla" }
];

export const colorTempData = [
	{
		data: [
			{x: -50, y:82, color: '#ff556f'},
			{x: 50,y:-25, color: '#51adc0'},
			{x: 75, y: -30, color: '#8567f0'},
			{x: 60, y: 30, color: '#ffffff'},
			{x: -12, y: -30, color: '#242b49'},
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
	},
	{
		data: [
			{x: -50, y:12, color: '#ff556f'},
			{x: 50,y:-75, color: '#51adc0'},
			{x: 75, y: -30, color: '#8567f0'},
		]
	}
];

export const platforms = [
	{name: 'Facebook', color: '#51adc0'},
	{name: 'Instagram', color: '#ff556f'},
	{name: 'Twitter', color: '#8567f0'},
	{name: 'Snapchat', color: '#acb0be'},
	{name: 'Youtube', color: '#ffffff'},
	{name: 'Pinterest', color: '#242b49'},
];

export const doughnutData =
	{
		title: "Frame Rate",
		secondTitle: "24fps",
		average: [30, 12, 6, 52]
	};

export const doughnutRoundData = [
	{data: '0-15 seconds', color: '#51adc0'},
	{data: '15-30 seconds', color: '#8567f0'},
	{data: '30-45 seconds', color: '#ff556f'},
	{data: '45-60 seconds', color: '#acb0be'},
];

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
	}
};

export const stackedChartData = {
	labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
	datasets: [{
		backgroundColor: '#ff556f',
		data: [
			25, 10, 14, 51
		]
	}, {
		backgroundColor: '#8567f0',
		data: [
			12, 24, 56, 9
		]
	}, {
		backgroundColor: '#acb0be',
		data: [
			42, 18, 18, 25
		]
	},{
		backgroundColor: '#51adc0',
		data: [
			21, 48, 12, 15
		]
	}]
};

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
			stacked: true,
			ticks: {
				fontColor: "#fff",
				fontSize: 12,
				stepSize: 1,
				beginAtZero: true,
				callback: function(value, index, values) {
					return value + '%';
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
	}
};

export default dummySummary;
