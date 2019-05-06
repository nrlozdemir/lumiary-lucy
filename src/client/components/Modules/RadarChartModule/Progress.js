import React from 'react';
import classnames from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import style from './style.scss';

export const Progress = ({progress = [], reverse = false}) => {
	return (
		<div className={style.progressBarArea}>
			{progress.map((progressItem, index) => (
				<div
					key={index}
					className={classnames(reverse ? style.reverse : '', style.progressBarInner)}
				>
					<p className={style.progressText}>
						<span className={style.leftTitle}>
							<span
								className={style.dot}
								style={{ background: progressItem.color }}
							/>
							<span>{progressItem.leftTitle}</span>
						</span>
						<span className={style.rightTitle}>
							{progressItem.rightTitle}
						</span>
					</p>
					<ProgressBar
						width={progressItem.value}
						customBarClass={style.progressBar}
						customPercentageClass={style.percentageBlue}
					/>
				</div>
			))}
		</div>
	);
}
