import React from 'react';
import { BubbleChart, Bubble, Visual, ToolTip } from "@saypr/bubble-chart/react";

import Select from 'Components/Form/Select';
import style from 'Containers/Audience/style.scss';
import { socialIconSelector } from "../../../../utils";

const bubblesMales = [
	{
		value: 30,
		visual: 'youtube'
	},
	{
		value: 25,
		visual: 'facebook'
	},
	{
		value: 20,
		visual: 'twitter'
	},
	{
		value: 15,
		visual: 'pinterest'
	},
	{
		value: 10,
		visual: 'instagram'
	}
];

const bubblesFemales = [
	{
		value: 20,
		visual: 'youtube'
	},
	{
		value: 35,
		visual: 'facebook'
	},
	{
		value: 20,
		visual: 'twitter'
	},
	{
		value: 15,
		visual: 'pinterest'
	},
	{
		value: 10,
		visual: 'instagram'
	}
];

const bubblesBoth = [
	{
		value: 20,
		visual: 'youtube'
	},
	{
		value: 25,
		visual: 'facebook'
	},
	{
		value: 20,
		visual: 'twitter'
	},
	{
		value: 15,
		visual: 'pinterest'
	},
	{
		value: 20,
		visual: 'instagram'
	}
];

export const Performance = props => {
	return (
		<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
			<div className={style.cardTitle + ' col-12'}>
				<span>Performance By Age, Gender and Date</span>
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
				</div>
			</div>
			<div className={'col-12'}>
				<div className={'col-4'}>
					<div className={style.bubbleCont}>
						<BubbleChart size={[800, 600]} fromPercentages={true}>
							{
								bubblesMales.map((bubble, i) => (
									<Bubble key={'bubble-' + i} radius={bubble.value} fill="#303a5d" stroke="#d0506c">
										<Visual><span className={socialIconSelector(bubble.visual) + ' ' + style.bubbleVisual}></span></Visual>
									</Bubble>
								))
							}
						</BubbleChart>
						<div className={style.label}>
							<span>Males</span>
						</div>
					</div>
				</div>
				<div className={'col-4'}>
					<div className={style.bubbleCont}>
						<BubbleChart size={[800, 600]} fromPercentages={true}>
							{
								bubblesFemales.map((bubble, i) => (
									<Bubble key={'bubble-' + i} radius={bubble.value} fill="#303a5d" stroke="#51adc0">
										<Visual><span className={socialIconSelector(bubble.visual) + ' ' + style.bubbleVisual}></span></Visual>
									</Bubble>
								))
							}
						</BubbleChart>
						<div className={style.label}>
							<span>Females</span>
						</div>
					</div>
				</div>
				<div className={'col-4'}>
					<div className={style.bubbleCont}>
						<BubbleChart size={[800, 600]} fromPercentages={true}>
							{
								bubblesBoth.map((bubble, i) => (
									<Bubble key={'bubble-' + i} radius={bubble.value} fill="#303a5d" stroke="#8567f0">
										<Visual><span className={socialIconSelector(bubble.visual) + ' ' + style.bubbleVisual}></span></Visual>
									</Bubble>
								))
							}
						</BubbleChart>
						<div className={style.label}>
							<span>Both</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
