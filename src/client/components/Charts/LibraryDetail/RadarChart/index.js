import React from 'react'
import { Radar } from "react-chartjs-2";

const RadarChart = ({data}) => (
	<Radar
		data={data}
		options={{
			legend: {
				display: false
      },
      plugins: {
        datalabels: false
      },
			tooltips: {
				backgroundColor: "#fff",
				cornerRadius: 0,
				titleFontColor: "#000",
				mode: "point",
				bodyFontColor: "#000"
			},
			layout: {
				padding: {
					left: 35,
					right: 50,
					top: 0,
					bottom: 0
				}
			},

			scale: {
				gridLines: {
					display: true,
					lineWidth: 10
				},
				pointLabels: {
					callback: function(value, index, values) {
						return "●";
					},
					fontSize: 30,
					fontColor: data.labels.map(lbl => lbl)
				},
				ticks: {
					display: false,
					maxTicksLimit: 5
				}
			}
		}
		}
	/>
);

export default RadarChart;
