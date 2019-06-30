import React from 'react'
import cx from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const getBrandNamesFromObject = (field, options) => {
  return options.find((item) => item.value === field).label
}

const canSelect = (fields) => {
  const selectedFields = fields.names.filter(
    (field) => fields[field].input.checked
  )
  const checkValid = selectedFields.length === fields.canSelect
  fields.checkboxValidation(checkValid) // for parent validation
  return checkValid // for here validation
}

const SelectBox = (props) => {
  const { options } = props
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return options.map((field, idx) => {
          const isChecked = props[field.value].input.checked
          return (
            <div
              key={idx}
              className={cx(style.selectBoxContainer, {
                [style.selected]: isChecked,
              })}
              style={{
                background: isChecked
                  ? colors.customSelectActiveBackground
                  : colors.customSelectBackground,
                borderColor: isChecked
                  ? colors.customSelectActiveBorder
                  : colors.customSelectBorder,
              }}
            >
              <label
                htmlFor={field.value}
                style={{
                  color: colors.customSelectColor,
                }}
              >
                {field.label}
              </label>
              <input
                {...props[field.value].input}
                className={style.selectBox}
                type="checkbox"
                id={field.value}
                disabled={!isChecked && canSelect(props)}
                value={field.value}
                onChange={(event) => {
                  props[event.target.value].input.onChange(
                    !props[event.target.value].input.checked
                  )
                  canSelect(props)
                }}
              />
              <span
                className={cx(style.selectCircle)}
                style={{
                  background: isChecked
                    ? colors.customSelectCircleColor
                    : colors.customSelectBackground,
                  borderColor: isChecked
                    ? colors.customSelectActiveBorder
                    : colors.customSelectCircleBorderColor,
                }}
              />
            </div>
          )
        })
      }}
    </ThemeContext.Consumer>
  )
}

export default SelectBox
