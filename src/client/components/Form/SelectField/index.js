import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Field } from 'redux-form'
import Select from '../Select'
import style from './styles.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const SelectField = (props) => {
  const { className, id, label, name, validate, ...rest } = props

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className={cx(style.selectField, className)}>
          {label ? (
            <label
              className={style.label}
              htmlFor={id}
              style={{ color: colors.textColor }}
            >
              {label}
            </label>
          ) : null}
          <Field
            id={id}
            component={Select}
            name={name}
            type="select"
            validate={validate}
            {...rest}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

SelectField.propTypes = {
  defaultOption: PropTypes.number,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  validate: PropTypes.func,
}

SelectField.defaultProps = {
  defaultOption: null,
  label: null,
  validate: null,
}

export default SelectField
