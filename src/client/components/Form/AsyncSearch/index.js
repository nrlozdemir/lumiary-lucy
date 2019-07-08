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
      padding: 0,
      color:
        state.isSelected || state.isFocused
          ? colors.searchOptionsColor
          : colors.searchColor,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      height: '40px',
      lineHeight: '27px',
      backgroundColor: isSelected
        ? colors.inputOptionSelectedBackground
        : isFocused
        ? colors.inputOptionFocusBackground
        : colors.inputOptionBackground,
      color: isSelected
        ? colors.inputColor
        : isFocused
        ? colors.inputActiveColor
        : colors.inputActiveColor,
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }),
    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      background: colors.inputControlBackground,
      color: isSelected
        ? colors.inputControlBorder
        : isFocused
        ? colors.inputControlBorder
        : colors.inputControlSelectedBorder,
      borderRadius: '8px',
      borderWidth: '1px',
      boxShadow: 'rgba(0, 0, 0, 0.5)',
      '&:hover': {
        borderColor: 'none',
      },
    }),
    noOptionsMessage: (
      styles,
      { data, isDisabled, isFocused, isSelected }
    ) => ({
      ...styles,
      backgroundColor: colors.searchOptionsColor,
      color: isSelected
        ? colors.inputColor
        : isFocused
        ? colors.inputActiveColor
        : colors.inputColor,
    }),
    input: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: colors.inputActiveColor,
    }),
    singleValue: (styles, state) => ({
      ...styles,
      color: colors.inputActiveColor,
    }),
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isFocused
        ? colors.inputActiveColor
        : isSelected
        ? colors.inputColor
        : colors.inputPlaceholderColor,
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
