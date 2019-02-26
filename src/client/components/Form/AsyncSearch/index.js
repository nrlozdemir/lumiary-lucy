import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Async from 'react-select/lib/Async'

import { initialOptions } from "./options";
import style from "./styles.scss"

const AsyncSearch = props => {
	const { id, options, placeholder, multiple, customClass, loadOptions } = props

	let args = props.input ? props.input : props
	let { name, onChange, value } = args

	const reduxFormOnChange = option => {
		onChange(option)
	};

	const selectClass = classNames(`${customClass} ` + style.Select, {
		[style.selected]: !!value
	})

	return (
		<Async
			id={id}
			className={selectClass}
			clearable={false}
			name={name}
			loadOptions={loadOptions}
			onChange={!!props.input ? reduxFormOnChange : onChange}
			options={options || initialOptions}
			searchable={false}
			placeholder={placeholder}
			multi={multiple}
			{...(value ? { value } : { value: null })}
		/>
	)
}

AsyncSearch.propTypes = {
	input: PropTypes.object,
	name: PropTypes.string,
	onChange: PropTypes.func,
	multiple: PropTypes.bool,
	placeholder: PropTypes.string,
	customClass: PropTypes.string,
	options: PropTypes.array,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object
	])
}

AsyncSearch.defaultProps = {
	input: null,
	name: null,
	onChange: null,
	options: null,
	customClass: null,
	multiple: false,
	value: "",
	placeholder: "Select..."
}

export default AsyncSearch
