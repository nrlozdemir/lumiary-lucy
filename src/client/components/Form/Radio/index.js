import React from 'react'
import classnames from 'classnames/bind'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

const cx = classnames.bind(style)

class Button extends React.Component {
  render() {
    const {
      groupName,
      className,
      icon,
      label,
      value,
      input,
      handleChange,
      handleClick,
      selected,
      component,
      selectedClassName,
    } = this.props

    const OptionIcon = component
    let classNames = null

    if (selected && Array.isArray(selected)) {
      const selectedItems = selected.find((item) => item.value === value)

      classNames = classnames({
        [style.selected]: selectedItems,
        [selectedClassName]: selectedItems,
      })
    } else {
      const selectedItem = selected && selected == value

      classNames = classnames({
        [style.selected]: selectedItem,
        [selectedClassName]: selectedItem,
      })
    }

    return (
      <li className={classNames}>
        <label>
          <OptionIcon className={className} />
          <span>{label}</span>

          <Field
            {...input}
            name={groupName}
            component="input"
            type="radio"
            value={`${value}`}
            onChange={() => handleChange(this)}
            onClick={() => handleClick(this)}
          />
        </label>
      </li>
    )
  }
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  groupName: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  input: PropTypes.object,
  selectedClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}

export default Button
