import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Async from 'react-select/lib/Async'

import style from "./styles.scss"

const AsyncSearch = props => {
	const { id, options, placeholder, multiple, customClass, loadOptions, input, onInputChange } = props

	let args = props.input ? props.input : props
	let { name, onChange, value } = args

	const reduxFormOnChange = option => {
		onChange(option)
	};

	const selectClass = classNames(`${customClass} ` + style.Select, {
		[style.selected]: !!value
	})

	const customStyles = {
		menu: (provided, state) => ({
			...provided,
			color: state.isSelected || state.isFocused ? '#5a6386' : '#ffffff',
			backgroundColor:'#5a6386',
			borderRadius: 0,
			marginLeft: '-40px',
		}),
		menuList: (provided, state) => ({
			...provided,
			backgroundColor: '#5a6386',
			color: state.isSelected || state.isFocused ? '#5a6386' : '#242b49',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected || state.isFocused ? '#ffffff' : '#5a6386',
			color: state.isSelected || state.isFocused ? '#5a6386' : '#ffffff',
			cursor: state.isDisabled ? 'not-allowed' : 'default',
		}),
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#242b49',
			color: state.isSelected || state.isFocused ? '#5a6386' : '#ffffff',
		}),
		noOptionsMessage: (provided, state) => ({ ...provided, backgroundColor: '#5a6386', color: '#ffffff' }),
		input: (provided, state) => ({ ...provided, color: '#ffffff' }),
		placeholder: (provided, state) => ({ ...provided, color: '#ffffff' })
	}

	return (
		<Async
			id={id}
			clearable={false}
			name={name}
			loadOptions={loadOptions}
			onInputChange={onInputChange}
			className={selectClass}
			onChange={!!props.input ? reduxFormOnChange : onChange}
			cacheOptions
			defaultOptions
			options={options}
			searchable={false}
			placeholder={placeholder}
			multi={multiple}
			styles={customStyles}
			{...input}
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
