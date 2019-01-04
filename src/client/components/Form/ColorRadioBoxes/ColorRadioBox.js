import React from "react";
import classnames from "classnames";
import style from "./style.scss";

const ColorRadioBox = props => {
	return (
		<div className={style.radioContainer} key={props.color.color}>
			<input
				id={props.color.name}
				type="radio"
				className={style.radioInput}
				name="colorRadio"
			/>
			<div
				onClick={() => props.input.onChange(props.color)}
				htmlFor={props.color.name}
				className={classnames(style.colorCol, {
					[style.selected]: props.input.value.color === props.color.color
				})}
				style={{ backgroundColor: props.color.color }}
			/>
		</div>
	);
};
export default ColorRadioBox;
