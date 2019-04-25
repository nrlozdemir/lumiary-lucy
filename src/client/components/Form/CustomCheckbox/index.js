import React from 'react'
import cx from 'classnames'
import style from './style.scss'

const getBrandNamesFromObject = (field, options) => {
  return options.find((item) => item.value === field).label
}

const canSelect = (fields) => {
  const selectedFields = fields.names.filter(
    (field) => fields[field].input.value === true
  )
  if (selectedFields.length < fields.canSelect) {
    fields.checkboxValidation(false)
  } else {
    fields.checkboxValidation(true)
  }

  return selectedFields.length == fields.canSelect
}

const SelectBox = (props) => {
  return props.names.map((field) => {
    return (
      <div
        className={cx(style.selectBoxContainer, {
          [style.selected]: props[field].input.value,
        })}
      >
        <label htmlFor={props[field].input.name}>
          {getBrandNamesFromObject(field, props.options)}
        </label>
        <input
          className={style.selectBox}
          type="checkbox"
          id={props[field].input.name}
          {...props[field].input}
          disabled={props[field].input.value ? false : canSelect(props)}
        />
        <span className={cx(style.selectCircle)} />
      </div>
    )
  })
}

export default SelectBox
