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
  }],
  beforeDraw: function(chart, easing) {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      const ctx = chart.chart.ctx;
      const chartArea = chart.chartArea;

      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
      ctx.restore();
    }
  }
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
  }
};

export const dropdownLists = {
  duration: [
    {name: "0 - 15ms"},
    {name: "15 - 30ms"},
    {name: "30 - 45ms"},
    {name: "45 - 60ms"},
  ],
  views: [
    {name: "Views"},
    {name: "Likes"},
    {name: "Shares"},
    {name: "Comments"}
  ],
  socialMedia: [
    {name: "Facebook"},
    {name: "Instagram"},
    {name: "Twitter"},
    {name: "Snapchat"},
    {name: "Youtube"},
    {name: "Pinterest"}
  ],
  dateRange: [
    {name: "Past 24 Hours"},
    {name: "Past Week"},
    {name: "Past Month"},
    {name: "Past 3 Month"},
  ],
};

export const dateSelectOptions = [
  { value: "Today", label: "Today" },
  { value: "Past Week", label: "Past Week" },
  { value: "Past Month", label: "Past Month" },
  { value: "Past 3 Months", label: "Past 3 Months" },
  { value: "custom", label: "Custom" }
];

export default dummySummary;
