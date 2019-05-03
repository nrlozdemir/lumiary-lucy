import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import style from './styles.scss'
import { withTheme } from 'ThemeContext/withTheme'

const Select = (props) => {
  const { className, id, options, placeholder, multiple, customClass } = props

  const themes = props.themeContext.colors

  const themes = props.themeContext.colors

  let args = props.input ? props.input : props
  let { name, onChange, value } = args

  // if (props.input) {
  // 	var {
  // 		input: { name, onChange, value, customClass }
  // 	} = props;
  // } else {
  // 	var { name, onChange, value, customClass } = props;
  // }

  const reduxFormOnChange = (option) => {
    onChange(option)
  }

  const selectClass = classNames(`${customClass} ` + style.Select, {
    [style.selected]: !!value,
  })
  const DropdownIndicator = (props) => {
    const menuIsOpenClass = classNames('icon-Arrow-Down', style.iconIndicator, {
      [style.active]: props.hasValue,
      [style.focus]: props.selectProps.menuIsOpen,
    })
    return (
      <div className={style.DropdownIndicator}>
        <span className={menuIsOpenClass} style={{ color: themes.textColor }}>
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
        </span>
      </div>
    )
  }

  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        background: themes.selectBackground,
        borderColor: isSelected
          ? '#acb0be'
          : isFocused
          ? '#acb0be'
          : themes.selectBorder,
        borderRadius: '8px',
        borderWidth: '1px',
        boxShadow: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          borderColor: 'none',
        },
      }
    },
    input: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: themes.textColor,
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        height: '40px',
        lineHeight: '27px',
        backgroundColor: isSelected
          ? '#21243B'
          : isFocused
          ? '#ffffff'
          : '#545B79',
        color: isSelected
          ? themes.textColor
          : isFocused
          ? '#545B79'
          : themes.textColor,
        cursor: 'pointer',
        border: 'none',
      }
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused
          ? themes.textColor
          : isSelected
          ? themes.textColor
          : '#545B79',
      }
    },
    singleValue: (styles) => ({
      ...styles,
      color: themes.textColor,
    }),
    menu: (base) => ({
      ...base,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
      borderRadius: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  }

  return (
    <ReactSelect
      components={{ DropdownIndicator }}
      id={id}
      className={selectClass}
      clearable={false}
      name={name}
      onChange={!!props.input ? reduxFormOnChange : onChange}
      options={options}
      searchable={false}
      placeholder={placeholder}
      multi={multiple}
      styles={colourStyles}
      {...(value ? { value } : { value: null })}
    />
  )
}

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
    PropTypes.object,
  ]),
}

Select.defaultProps = {
  input: null,
  name: null,
  onChange: null,
  options: null,
  customClass: null,
  multiple: false,
  value: '',
  placeholder: 'Select...',
}

export default withTheme(Select)
