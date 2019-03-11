import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import AsyncCreatable from 'react-select/lib/AsyncCreatable'

import style from "./styles.scss"

const AsyncSearch = props => {
  const { id, options, placeholder, multiple, customClass, loadOptions, value, name, onChange } = props

  const selectClass = classNames(`${customClass} ` + style.Select, {
    [style.selected]: !!value
  })

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? '#5a6386' : '#ffffff',
      backgroundColor: '#5a6386',
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
    singleValue: (provided, state) => ({ ...provided, color: '#ffffff' }),
    placeholder: (provided, state) => ({ ...provided, color: '#ffffff' })
  }

  return (
    <AsyncCreatable
      id={id}
      name={name}
      loadOptions={loadOptions}
      className={selectClass}
      onChange={onChange}
      cacheOptions
      defaultOptions
      options={options}
      placeholder={placeholder}
      multi={multiple}
      styles={customStyles}
      value={value}
      isClearable={true}
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
