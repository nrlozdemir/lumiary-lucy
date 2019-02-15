export function getPanopticData() {
	return {
		colorTempData: [
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
    ],
    videoReleasesData: {
      labels: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      datasets: [
        {
          label: 'Dataset 1',
          display: false,
          backgroundColor: "#51adc0",
          data: [
            45000,
            55000,
            55000,
            70000,
            55000,
            45000,
            55000
          ]
        }, {
          label: 'Dataset 2',
          backgroundColor: "#ff556f",
          data: [
            -45000,
            -50000,
            -30000,
            -55000,
            -70000,
            -55000,
            -30000
          ]
        }
      ]
    },
    verticalStackedChartData: {
      doughnutData: {
        title: "Frame Rate",
        secondTitle: "24fps",
        average: [30, 12, 6, 52]
      },
      stackedChartData: {
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
      },
      doughnutRoundData: [
        {data: '0-15 seconds', color: '#51adc0'},
        {data: '15-30 seconds', color: '#8567f0'},
        {data: '30-45 seconds', color: '#ff556f'},
        {data: '45-60 seconds', color: '#acb0be'},
      ],
    },
    pacingChartData: {
      labels: ["Live Action", "Stop Motion", "Cinemagraph", "Animation"],
      datasets: [
        {
          label: "Slowest",
          backgroundColor: "#51adc0",
          borderColor: "#51adc0",
          borderWidth: 1,
          data: [10, 3, 5, 1]
        },
        {
          label: "Slow",
          backgroundColor: "#8567f0",
          borderColor: "#8567f0",
          borderWidth: 1,
          data: [12, 13, 2, 5]
        },
        {
          label: "Medium",
          backgroundColor: "#ff556f",
          borderColor: "#ff556f",
          borderWidth: 1,
          data: [4, 5, 4, 2]
        },
        {
          label: "Fast",
          backgroundColor: "#acb0be",
          borderColor: "#acb0be",
          borderWidth: 1,
          data: [9, 8, 1, 4]
        }
      ]
    },
    compareSharesData: {
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
    }
	};
}