import React from 'react';

import Select from 'Components/Form/Select';
import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import style from 'Containers/Audience/style.scss';
import sectionStyle from './style.scss';
import { Progress } from "./Progress";

const chartData = [
	{
		"type": "Facebook",
		"datas": {
			"labels": [
				{
					"color": "#cc2226",
					"count": "96.7",
					"name": "Red",
					"selected": true
				},
				{
					"color": "#dd501d",
					"count": "25.7",
					"name": "Red-Orange",
					"selected": false
				},
				{
					"color": "#eb7919",
					"count": "50.1",
					"name": "Orange",
					"selected": false
				},
				{
					"color": "#f8b90b",
					"count": "15.7",
					"name": "Yellow-Orange",
					"selected": false
				},
				{
					"color": "#fff20d",
					"count": "55.6",
					"name": "Yellow",
					"selected": true
				},
				{
					"color": "#aac923",
					"count": "15.2",
					"name": "Yellow-Green",
					"selected": false
				},
				{
					"color": "#13862b",
					"count": "48.1",
					"name": "Green",
					"selected": false
				},
				{
					"color": "#229a78",
					"count": "25",
					"name": "Blue-Green",
					"selected": false
				},
				{
					"color": "#3178b0",
					"count": "100",
					"name": "Blue",
					"selected": true
				},
				{
					"color": "#79609b",
					"count": "40.4",
					"name": "Blue-Purple",
					"selected": false
				},
				{
					"color": "#923683",
					"count": "18.1",
					"name": "Purple",
					"selected": false
				},
				{
					"color": "#b83057",
					"count": "25.7",
					"name": "Red-Purple",
					"selected": false
				}
			],
			"datasets": [
				{
					"label": "Facebook",
					"backgroundColor": "rgba(255, 255, 255, 0.3)",
					"borderColor": "transparent",
					"pointBackgroundColor": "#ffffff",
					"pointBorderColor": "#ffffff",
					"data": [75, 25, 50, 15, 55, 15, 48, 25, 100, 40, 18, 25]
				}
			]
		},
		"progress": [
			{
				"leftTitle": "Blue",
				"color": "#3178b0",
				"rightTitle": "91.6k Shares",
				"value": 60
			},
			{
				"leftTitle": "Red",
				"color": "#cc2226",
				"rightTitle": "64.3k Shares",
				"value": 45
			},
			{
				"leftTitle": "Yellow",
				"color": "#fff20d",
				"rightTitle": "54.8k Shares",
				"value": 30
			}
		]
	},
	{
		"type": "YouTube",
		"datas": {
			"labels": [
				{
					"color": "#cc2226",
					"count": "96.7",
					"name": "Red",
					"selected": false
				},
				{
					"color": "#dd501d",
					"count": "25.7",
					"name": "Red-Orange",
					"selected": true
				},
				{
					"color": "#eb7919",
					"count": "50.1",
					"name": "Orange",
					"selected": false
				},
				{
					"color": "#f8b90b",
					"count": "15.7",
					"name": "Yellow-Orange",
					"selected": true
				},
				{
					"color": "#fff20d",
					"count": "55.6",
					"name": "Yellow",
					"selected": false
				},
				{
					"color": "#aac923",
					"count": "15.2",
					"name": "Yellow-Green",
					"selected": false
				},
				{
					"color": "#13862b",
					"count": "48.1",
					"name": "Green",
					"selected": true
				},
				{
					"color": "#229a78",
					"count": "25",
					"name": "Blue-Green",
					"selected": false
				},
				{
					"color": "#3178b0",
					"count": "100",
					"name": "Blue",
					"selected": false
				},
				{
					"color": "#79609b",
					"count": "40.4",
					"name": "Blue-Purple",
					"selected": false
				},
				{
					"color": "#923683",
					"count": "18.1",
					"name": "Purple",
					"selected": false
				},
				{
					"color": "#b83057",
					"count": "25.7",
					"name": "Red-Purple",
					"selected": false
				}
			],
			"datasets": [
				{
					"label": "YouTube",
					"backgroundColor": "rgba(255, 255, 255, 0.3)",
					"borderColor": "transparent",
					"pointBackgroundColor": "#ffffff",
					"pointBorderColor": "#ffffff",
					"data": [30, 100, 25, 70, 22, 26, 55, 15, 48, 25, 30, 50]
				}
			]
		},
		"progress": [
			{
				"leftTitle": "Orange",
				"color": "#dd501d",
				"rightTitle": "98.1k Shares",
				"value": 80
			},
			{
				"leftTitle": "Yellow - Orange",
				"color": "#f8b90b",
				"rightTitle": "75.3k Shares",
				"value": 65
			},
			{
				"leftTitle": "Green",
				"color": "#13862b",
				"rightTitle": "66.8k Shares",
				"value": 45
			}
		]
	}
];

export const DominantColor = props => {
	return (
		<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
			<div className={style.cardTitle + ' col-12'}>
				<span>Dominant Color Performance By Gender</span>
				<div className={style.selects}>
					<Select
						name="views"
						customClass="custom-select"
						placeholder="Select Views"
						// value={views || ''}
						value={''}
						onChange={(option) => this.handleChange(option, 'views')}
						options={[{ value: 'Views', label: 'Views' }, { value: 'Comments', label: 'Comments' }]}
					/>
					<Select
						name="platforms"
						customClass="custom-select"
						placeholder="Select Platforms"
						// value={platforms || ''}
						value={''}
						onChange={(option) => this.handleChange(option, 'platforms')}
						options={[{ value: 'All Platforms', label: 'All Platforms' }]}
					/>
					<Select
						name="platforms"
						customClass="custom-select"
						placeholder="Select Platforms"
						// value={platforms || ''}
						value={''}
						onChange={(option) => this.handleChange(option, 'platforms')}
						options={[{ value: 'All Platforms', label: 'All Platforms' }]}
					/>
				</div>
			</div>
			<div className="col-6">
				<div className={style.label}>
					<span>Male</span>
				</div>
				<div style={{padding: "0 40px"}}>
					<RadarChart data={chartData[0].datas} />
				</div>
			</div>
			<div className="col-6">
				<div className={style.label}>
					<span>Female</span>
				</div>
				<div style={{padding: "0 40px"}}>
					<RadarChart data={chartData[1].datas} />
				</div>
			</div>
			<div className={"col-12 " + sectionStyle.progressContainer}>
				<Progress progress={chartData[0].progress} />
        <div className={sectionStyle.progressCountArea}>
          <span className={sectionStyle.progressCount}>1</span>
          <span className={sectionStyle.progressCount}>2</span>
          <span className={sectionStyle.progressCount}>3</span>
        </div>
				<Progress progress={chartData[1].progress} reverse={true} />
			</div>
		</div>
	)
};
