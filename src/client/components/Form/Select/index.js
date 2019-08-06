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

class _Group extends React.Component {
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
      <div
        style={{
          backgroundColor: this.props.themeContext.colors
            .inputControlBackground,
        }}
      >
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

const Group = withTheme(_Group)

class SingleValue extends React.Component {
  render() {
    const { children, options, data } = this.props
    let label = children

    if (data.value && data.value.includes('|')) {
      const platform = options.find((option) =>
        option.options.some((o) => o.value === data.value)
      ).label
      label = `${data.label} on ${platform}`
    }

    return (
      <components.SingleValue {...this.props} alt={label}>
        {label}
      </components.SingleValue>
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
    isReportDropdown,
    inModuleFilter,
  } = props
  const themes = props.themeContext.colors

  let args = props.input ? props.input : props
  let { name, onChange, value } = args

  let labels = options.map(({ label, options: labelOptions }) => {
    if (labelOptions) {
      return labelOptions.map((o) => `${label} on ${o.label}`.length)
    }
    return label.length
  })
  if (labels && typeof labels[0] === 'object') {
    const customLabels = []
    labels.map((value) => {
      value.map((v) => {
        customLabels.push(v)
      })
    })
    labels = customLabels
  }
  const maxLenght = labels.sort((a, b) => b - a)[0]

  const reduxFormOnChange = (option) => {
    onChange(option)
  }

  const selectClass = classNames(`${customClass} ` + style.Select, {
    [style.selected]: !!value,
  })

  const colourStyles = {
    control: (
      styles,
      { data, isDisabled, isFocused, isSelected, hasValue }
    ) => {
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
        ...(inModuleFilter ? { width: 76 + maxLenght * 7.4 } : {}),
        color: isFocused
          ? themes.inputActiveColor
          : hasValue
          ? themes.inputActiveColor
          : isReportDropdown
          ? themes.moduleBorder
          : themes.inputActiveColor,
      }
    },
    input: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isSelected
          ? themes.inputColor
          : isFocused
          ? themes.inputActiveColor
          : isReportDropdown
          ? themes.moduleBorder
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
          ? themes.inputDropdownColor
          : isFocused
          ? themes.inputActiveColor
          : themes.inputActiveSelectedColor,
        cursor: 'pointer',
        border: 'none',
        width: '100%',
      }
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused
          ? themes.inputColor
          : isSelected
          ? themes.inputColor
          : isReportDropdown
          ? themes.moduleBorder
          : themes.inputPlaceholderColor,
        whiteSpace: 'nowrap',
        position: 'unset',
        transform: 'unset',
        maxWidth: '100%',
      }
    },
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: themes.inputColor,
      position: 'unset',
      transform: 'unset',
      maxWidth: '100%',
    }),
    menu: (base) => ({
      ...base,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
      borderRadius: 0,
      zIndex: 100,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      minWidth: 'max-content',
    }),
  }

  return (
    <ReactSelect
      components={{ DropdownIndicator, Group, SingleValue }}
      id={id}
      className={selectClass}
      classNamePrefix="react-select"
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
