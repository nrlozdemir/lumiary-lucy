import React from 'react'

import sectionStyle from './style.scss';
import style from 'Containers/Audience/style.scss';
import { platforms, selectOneOptions, selectTwoOptions } from './options'

import { ColorTemperature as Chart } from 'Components/ColorTemperatureChart/ColorTemperature'
import SelectFilters from 'Components/SelectFilters'
import Select from 'Components/Form/Select';

const colorTempData = [
	{
		"text": "This is a blurb that will explain what this graph is showing",
		"data": [
			{ "x": -50, "y": 82, "color": "#ff556f" },
			{ "x": 50, "y": -25, "color": "#51adc0" },
			{ "x": 75, "y": -30, "color": "#8567f0" },
			{ "x": 60, "y": 30, "color": "#ffffff" },
			{ "x": -12, "y": -30, "color": "#242b49",  }
		]
	},
	{
		"text": "This is a blurb that will explain what this graph is showing",
		"data": [
			{ "x": -50, "y": 12, "color": "#ff556f" },
			{ "x": 50, "y": 25, "color": "#51adc0" },
			{ "x": 75, "y": -30, "color": "#8567f0" }
		]
	},
	{
		"text": "This is a blurb that will explain what this graph is showing",
		"data": [
			{ "x": -50, "y": 12, "color": "#ff556f" },
			{ "x": 50, "y": -75, "color": "#51adc0" },
			{ "x": 75, "y": -30, "color": "#8567f0" }
		]
	}
];

export const ColorTemperature = ({
  handleSelectFilters,
  selectWarmColor,
  selectDate,
}) => (
	<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
		<div className={style.cardTitle + ' col-12'}>
			<span>Color Temperature / Sentiment Comparison</span>
      <div className={"d-flex align-items-center justify-space-between " + style.headerLabel}>
        <div className="d-flex align-items-center mr-32">
          <span className={style.redRound} />
          <p>Male</p>
        </div>
        <div className="d-flex align-items-center mr-32">
          <span className={style.duskRound} />
          <p>Female</p>
        </div>
      </div>
			<div className={style.selects}>
				<Select
					name="platforms"
					customClass="custom-select"
					placeholder="Past Month"
					value={''}
					onChange={console.log}
					options={[{ value: 'Past Year', label: 'Past Year' }]}
				/>
			</div>
		</div>
		<div className="col-12" style={{display: 'flex', padding: "40px 0"}}>
			{
				colorTempData.map((temp, index) => (
					<div className="col-4" key={"temp-chart-" + index}>
						<Chart temp={temp} />
						<div style={{marginTop: 60}}>{temp.text}</div>
					</div>
				))
			}
		</div>
	</div>
);
