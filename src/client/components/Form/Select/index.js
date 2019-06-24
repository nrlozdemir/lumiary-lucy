import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactSelect, { components } from 'react-select'
import style from './styles.scss'
import { withTheme } from 'ThemeContext/withTheme'

const DropdownIndicator = (props) => {
  const menuIsOpenClass = classNames('icon-Arrow-Down', style.iconIndicator, {
    [style.active]: props.hasValue,
    [style.focus]: props.selectProps && props.selectProps.menuIsOpen,
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

class Group extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const {
      props,
      state: { open },
    } = this

    return (
      <div>
        <h4 onClick={this.handleToggle} className={style.groupLabel}>
          {props.data.label}
          <span style={{ transform: !open ? 'rotate(-90deg)' : 'none' }}>
            <DropdownIndicator />
          </span>
        </h4>
        <div style={{ display: open ? 'block' : 'none' }}>{props.children}</div>
      </div>
    )
  }
}

const Select = (props) => {
  const {
    className,
    id,
    options,
    placeholder,
    multiple,
    customClass,
    isActive,
  } = props

  const themes = props.themeContext.colors

  let args = props.input ? props.input : props
  let { name, onChange, value } = args

  const reduxFormOnChange = (option) => {
    onChange(option)
  }

  const selectClass = classNames(`${customClass} ` + style.Select, {
    [style.selected]: !!value,
  })

  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        background: isActive
          ? themes.tabActiveBackground
          : themes.inputControlBackground,
        borderColor: isSelected
          ? themes.inputControlBorder
          : isFocused
          ? themes.inputControlBorder
          : themes.inputControlSelectedBorder,
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
        color: isSelected
          ? themes.inputColor
          : isFocused
          ? themes.inputActiveColor
          : themes.inputColor,
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        height: '40px',
        lineHeight: '27px',
        backgroundColor: isSelected
          ? themes.inputOptionSelectedBackground
          : isFocused
          ? themes.inputOptionFocusBackground
          : themes.inputOptionBackground,
        color: isSelected
          ? themes.inputColor
          : isFocused
          ? themes.inputActiveColor
          : themes.inputActiveColor,
        cursor: 'pointer',
        border: 'none',
      }
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused
          ? themes.inputColor
          : isSelected
          ? themes.inputColor
          : themes.inputActiveColor,
      }
    },
    singleValue: (styles) => ({
      ...styles,
      color: themes.inputActiveColor,
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
      components={{ DropdownIndicator, Group }}
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
