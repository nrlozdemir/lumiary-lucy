import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactSelect from "react-select";
import style from "./styles.scss";

const Select = props => {
	const { className, id, options, placeholder, multiple } = props;
	if (props.input) {
		var {
			input: { name, onChange, value }
		} = props;
	} else {
		var { name, onChange, value } = props;
	}

	const reduxFormOnChange = option => {
		onChange(option);
	};

	const selectClass = classNames(style.Select, {
		[style.selected]: !!props.input.value,
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
	options: PropTypes.array.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Select.defaultProps = {
	input: null,
	name: null,
	onChange: null,
	options: null,
	multiple: false,
	value: "",
	placeholder: "Select..."
};

export default Select;
