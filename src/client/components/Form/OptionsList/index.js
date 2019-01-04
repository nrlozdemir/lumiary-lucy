import React from 'react'
import PropTypes from 'prop-types'
import { Fieldset } from '../Fieldset'
import { Checkbox } from '../Checkbox'

import style from './styles.scss'

const OptionsList = ({ options, name, title, className, type, handleChange }) => {
  if (!options) {
    return null
  }

  const optionsArray = options.isArray ? options : Object.values(options)

  return (
    <div>
      <label>{title}</label>
        <ul className={style.checkList}>
         { optionsArray.map((option, idx) => {
            const { slug } = option
            return (
              <Checkbox
                key={`option-${idx}`}
                groupName={name}
                value={slug ? slug : option.name}
                label={option.name}
                type={type}
                handleChange={handleChange}
              />
            )
          }) }
        </ul>
    </div>
  )
}

export default OptionsList
