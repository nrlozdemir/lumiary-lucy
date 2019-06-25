import React from 'react'
import style from './style.scss'
// import PropTypes from 'prop-types';
import { Field } from 'redux-form'
import ColorRadioBox from './ColorRadioBox'
import { randomKey } from 'Utils'

/* eslint-disable react/prefer-stateless-function */
class ColorRadioBoxes extends React.Component {
  render() {
    const colors = [
      { color: '#cc2226', name: 'Red' },
      { color: '#dd501d', name: 'Tomato' },
      { color: '#eb7919', name: 'Orange' },
      { color: '#f8b90b', name: 'Gold' },
      { color: '#fff20d', name: 'Yellow' },
      { color: '#aac923', name: 'Soft Green' },
      { color: '#13862b', name: 'Green' },
      { color: '#229a78', name: 'Teal Green' },
      { color: '#3178b0', name: 'Blue' },
      { color: '#79609b', name: 'Dark Lavender' },
      { color: '#923683', name: 'Warm Purple' },
      { color: '#b83057', name: 'Dark Pink' },
    ]

    const renderRadioContainer = (props) => (
      <React.Fragment key={randomKey(5)}>
        <div className={style.radioRow}>
          {colors.map((color) => (
            <ColorRadioBox color={color} {...props} key={randomKey(5)} />
          ))}
        </div>

        <label
          className={style.label}
          style={{ backgroundColor: props.colors.bodyBackground }}
        >
          <div
            className={style.colorRadius}
            style={{ backgroundColor: props.input.value.color }}
          />
          <p
            className={style.colorName}
            style={{ color: props.colors.textColor }}
          >
            {props.input.value ? props.input.value.name : 'Select Color'}
          </p>
        </label>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <label
          className={style.inputLabel}
          style={{ color: this.props.colors.textColor }}
        >
          Dominate Color
        </label>
        <Field
          name="radioColorSelected"
          component={renderRadioContainer}
          colors={this.props.colors}
        />
      </React.Fragment>
    )
  }
}

ColorRadioBoxes.propTypes = {}

export default ColorRadioBoxes
