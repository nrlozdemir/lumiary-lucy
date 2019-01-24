/**
 *
 * Input
 *
 */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import style from "./style.scss";
/* eslint-disable react/prefer-stateless-function */
const Input = ({ error, value, label, placeholder, onChange, customClass }) => {
	const cx = classnames(
		style.input,
		{
			[style.error]: error,
			[style.typing]: !!value
		},
		customClass
	);
	return (
		<div className="w-100">
			{label ? (
				<label className={style.label} htmlFor={label}>
					{label}
				</label>
			) : null}
			<input
				onChange={onChange}
				id={label}
				className={cx}
				placeholder={placeholder}
				value={value}
			/>
		</div>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.bool
};

export default Input;
