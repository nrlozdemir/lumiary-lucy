import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactSelect from "react-select";
import style from "./styles.scss";

const Select = props => {
	const { className, id, options, placeholder, multiple } = props;
	if (props.input) {
		var {
			input: { name, onChange, value, customClass }
		} = props;
	} else {
		var { name, onChange, value, customClass } = props;
	}

	const reduxFormOnChange = option => {
		onChange(option);
	};

	const selectClass = classNames(`${customClass} ` + style.Select, {
		[style.selected]: !!value
	});

	return (
		<ReactSelect
			id={id}
			className={selectClass}
			clearable={false}
			name={name}
			onChange={!!props.input ? reduxFormOnChange : onChange}
			options={options}
			searchable={false}
			placeholder={placeholder}
			multi={multiple}
			{...(value ? { value } : { value: null })}
		/>
	);
};

Select.propTypes = {
	input: PropTypes.object,
	name: PropTypes.string,
	onChange: PropTypes.func,
	multiple: PropTypes.bool,
	placeholder: PropTypes.string,
	customClass: PropTypes.string,
	options: PropTypes.array.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	])
};

Select.defaultProps = {
	input: null,
	name: null,
	onChange: null,
	options: null,
	customClass: null,
	multiple: false,
	value: "",
	placeholder: "Select..."
};

export default Select;
