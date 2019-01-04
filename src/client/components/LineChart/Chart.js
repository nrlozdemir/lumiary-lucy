import React from "react";
import PropTypes from "prop-types";
import {
	Line
} from "react-chartjs-2";

import data from './dummyChartData';
import "chartjs-plugin-style";

class LineChart extends React.PureComponent {
	render() {
		const {
			width,
			height,
			options
		} = this.props;

		return ( 
    <div>
      <Line 
      data = { data }
			width = { width }
			height = {100}
			options = {{
        legend: {
          display: false
        },
        tooltips: {
          position: 'nearest',
          backgroundColor: '#fff',
          titleFontColor: '#242b49',
          bodyFontColor: '#242b49',
          footerFontColor: '#242b49',
          xPadding: 10,
          yPadding: 16,
          cornerRadius : 0,
          callbacks: {
            label: function(tooltipItem, data) {
              return null;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#5a6386',
              lineWidth: 0.7,
              drawBorder: false
            },
            ticks: {
              fontColor: "#fff",
              fontSize: 12,
              stepSize: 1,
              beginAtZero: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: '#5a6386',
              lineWidth: 0.7,
              drawBorder: false
            },
            ticks: {
              display: false
            }
          }]
        }
      }}
			/> 
      </div>
		);
	}
}

LineChart.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	data: PropTypes.array,
	options: PropTypes.object
};

export default LineChart;