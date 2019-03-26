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
    return (
      <div className={style.DropdownIndicator}>
        {props.selectProps.menuIsOpen ? (
          <span
            className="icon-Arrow-Down"
            style={{ transform: 'rotate(180deg)' }}
          >
            <span className="path1" />
            <span className="path2" />
            <span className="path3" />
          </span>
        ) : (
          <span className="icon-Arrow-Down">
            <span className="path1" />
            <span className="path2" />
            <span className="path3" />
          </span>
        )}
      </div>
    )
  }

  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        background: '#242b49',
        border: '1px solid #acb0be !important',
        borderRadius: '8px',
        boxShadow: 'none !important',
        '&:hover': {
          border: '1px solid #acb0be !important',
        },
      }
    },
    input: (styles) => ({
      ...styles,
      color: '#ffffff',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        height: '40px',
        lineHeight: '27px',
        backgroundColor: isFocused ? '#ffffff' : '#5a6386',
        color: isFocused ? '#5a6386' : '#ffffff',
        cursor: 'pointer',
        border: 'none',
      }
    },
    placeholder: (styles) => ({
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
