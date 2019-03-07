import React from 'react';
import classnames from 'classnames';

import style from './style.scss';

const ColorTemperatureChart = ({ colorTempData, borderLess, verticalText }) => {
	const leftText = classnames(style.textLeft, {
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
			<div key={index} className={style.colWrapper}>
				<div className={wrapper}>
					<div className={style.temperatureContent}>
						<p className={style.textTop}>{temp.topText ? temp.topText : "Happy"}</p>
						<p className={rightText}>{temp.topText ? temp.rightText : "Warm"}</p>
						<p className={style.textBottom}>{temp.topText ? temp.bottomText : "Sad"}</p>
						<p className={leftText}>{temp.topText ? temp.leftText : "Cool"}</p>
						<div className={style.verticalLine}></div>
						<div className={style.horizontalLine}></div>
						{
							temp.data.map((data, i) => (
								<span key={i}
									className={style.round}
									style={{ transform: `translateX(${data.x * 2}%) translateY(${data.y * 2}%)`, backgroundColor: `${data.color}` }}></span>
							))
						}
					</div>
				</div>
				<p>
					This is a blurb that will explain <br /> what this graph is showing
				</p>
			</div>
		))
	);
};

export default ColorTemperatureChart;
