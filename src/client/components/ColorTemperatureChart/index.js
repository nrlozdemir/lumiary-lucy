import React from 'react';
import classnames from 'classnames';

import style from './style.scss';

const ColorTemperatureChart = ({colorTempData, borderLess, verticalText}) =>
{
	const leftText = classnames(style.textLeft,{
		[style.verticalTextLeft]: verticalText
	});
	const rightText = classnames(style.textRight, {
		[style.verticalTextRight]: verticalText
	});
	const wrapper = classnames(style.temperatureContentWrapper, {
		[style.borderless]: borderLess
	});
	return (
		colorTempData && colorTempData.map((temp, index) => (
				<div key={index} className={wrapper}>
					<div className={style.temperatureContent}>
						<p className={style.textTop}>Happy</p>
						<p className={rightText}>Warm</p>
						<p className={style.textBottom}>Sad</p>
						<p className={leftText}>Cool</p>
						<div className={style.verticalLine}></div>
						<div className={style.horizontalLine}></div>
						{
							temp.data.map((data, i) => (
								<span key={i}
											className={style.round}
											style={{transform: `translateX(${data.x * 2}%) translateY(${data.y * 2}%)`, backgroundColor: `${data.color}`}}></span>
							))
						}
					</div>
				</div>
			)
		)
	);
};

export default ColorTemperatureChart;
