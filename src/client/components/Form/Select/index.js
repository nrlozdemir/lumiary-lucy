import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactSelect from 'react-select'
import style from './styles.scss'

const Select = (props) => {
  const { className, id, options, placeholder, multiple, customClass } = props

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
    console.log('props', props)
    const menuIsOpenClass = classNames('icon-Arrow-Down', style.iconIndicator, {
      [style.active]: props.hasValue,
      [style.focus]: props.selectProps.menuIsOpen,
    })
    return (
      <div className={style.DropdownIndicator}>
        <span className={menuIsOpenClass}>
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
        background: '#242b49',
        borderColor: isSelected ? '#acb0be' : isFocused ? '#acb0be' : '#5a6386',
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
        color: '#ffffff',
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        height: '40px',
        lineHeight: '27px',
        backgroundColor: isSelected
          ? '#242b49'
          : isFocused
          ? '#ffffff'
          : '#5a6386',
        color: isSelected ? '#ffffff' : isFocused ? '#5a6386' : '#ffffff',
        cursor: 'pointer',
        border: 'none',
      }
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused ? '#ffffff' : isSelected ? '#ffffff' : '#5a6386',
      }
    },
    singleValue: (styles) => ({
      ...styles,
      color: '#ffffff',
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

export default Select
