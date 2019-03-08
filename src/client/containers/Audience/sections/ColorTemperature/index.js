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
			<div className={style.selects}>
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
		<div className="col-12" style={{display: 'flex', padding: "40px 0"}}>
			{
				colorTempData.map((temp, index) => (
					<div className="col-4" key={"temp-chart-" + index}>
						<Chart temp={temp} />
						<div style={{marginTop: 60}}>{temp.text}</div>
					</div>
				))
			}
			{/* {colorTempData && (
        <ColorTemperatureChart
          borderLess
          verticalText
          colorTempData={colorTempData}
        />
      )} */}
		</div>
	</div>
);



// 	<div className="col-12 shadow-1 mt-72 bg-dark-grey-blue">
//     <div className={style.radialChartsContainer}>
//       <div className={style.temperatureHeader}>
//         <div>
//           <h2 className="font-secondary-first">Color Temperature / Sentiment Comparison</h2>
//         </div>
//         <div className={style.inputWrapper}>
//           <form className={style.form}>
//             <SelectFilters
//               handleSelectFilters={handleSelectFilters}
//               selectClasses="custom-select"
//               selectDate={selectDate}
//               selectWarmColor={selectWarmColor}
//               selectWarmColorShow={true}
//               selectDateShow={true}
//             />
//           </form>
//         </div>
//       </div>
//       <div className={style.temperatureContentContainer}>
//         {colorTempData && (
//           <ColorTemperatureChart
//             borderLess
//             verticalText
//             colorTempData={colorTempData}
//           />
//         )}
//       </div>
//       <div className={style.infoWrapperContainer}>
//         <div className={style.infoWrapper}>
//           <span className={style.infoText}>Views</span>
//         </div>
//         <div className={style.infoWrapper}>
//           <span className={style.infoText}>Likes</span>
//         </div>
//         <div className={style.infoWrapper}>
//           <span className={style.infoText}>Comment</span>
//         </div>
//         <div className={style.infoWrapper}>
//           <span className={style.infoText}>Shares</span>
//         </div>
//       </div>
//       <div className="d-flex align-items-center justify-content-center ph-48 mv-48">
//         {platforms &&
//           platforms.map((platform, index) => (
//             <div key={index} className="d-flex align-items-center mr-32">
//               <span
//                 className={style.round}
//                 style={{ backgroundColor: `${platform.color}` }}
//               />
//               <p className={style.platformName}>{platform.name}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   </div>
// )
