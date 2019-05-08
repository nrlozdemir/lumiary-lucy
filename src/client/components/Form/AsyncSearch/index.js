import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AsyncCreatable from 'react-select/lib/AsyncCreatable'
import style from './styles.scss'
import { withTheme } from 'ThemeContext/withTheme'

const AsyncSearch = (props) => {
  const {
    id,
    options,
    placeholder,
    multiple,
    customClass,
    loadOptions,
    value,
    name,
    onChange,
    themeContext: { colors },
  } = props

  const selectClass = classNames(`${customClass} ` + style.Select, {
    [style.selected]: !!value,
  })

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color:
        state.isSelected || state.isFocused
          ? colors.searchOptionsColor
          : '#ffffff',
      backgroundColor: colors.searchOptionsColor,
      borderRadius: 0,
      marginLeft: '-40px',
    }),
    menuList: (provided, state) => ({
      ...provided,
      backgroundColor: colors.searchOptionsColor,
      color:
        state.isSelected || state.isFocused
          ? colors.searchOptionsColor
          : colors.searchColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected || state.isFocused
          ? '#ffffff'
          : colors.searchOptionsColor,
      color:
        state.isSelected || state.isFocused
          ? colors.searchOptionsColor
          : '#ffffff',
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: colors.searchColor,
      color:
        state.isSelected || state.isFocused
          ? colors.searchOptionsColor
          : '#ffffff',
    }),
    noOptionsMessage: (provided, state) => ({
      ...provided,
      backgroundColor: colors.searchOptionsColor,
      color: '#ffffff',
    }),
    input: (provided, state) => ({
      ...provided,
      color: colors.textColor,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: colors.textColor,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: colors.placeholderColor,
    }),
  }

  return (
    <AsyncCreatable
      id={id}
      name={name}
      loadOptions={loadOptions}
      className={selectClass}
      onChange={onChange}
      defaultOptions
      options={options}
      placeholder={placeholder}
      multi={multiple}
      styles={customStyles}
      value={value}
      isClearable={true}
      formatCreateLabel={(input) => `Search: "${input}"`}
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
    PropTypes.object,
  ]),
}

AsyncSearch.defaultProps = {
  input: null,
  name: null,
  onChange: null,
  options: null,
  customClass: null,
  multiple: false,
  value: '',
  placeholder: 'Select...',
}

export default withTheme(AsyncSearch)
