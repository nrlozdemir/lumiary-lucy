import React from 'react'
import cx from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import { RadioButton } from 'Components/Form/Controls/Radio'
import style from './styles.scss'

class Group extends React.Component {

  render() {
    const {
      options, groupName, legend,
      handleChange, handleClick, extraClasses,
      selected, optionComponent, className, selectedClassName
    } = this.props

    if(!options.length){
      return null
    }

    const classNames = cx(
      [style.radioButtonGroup],
      style[className],
      extraClasses
    )

    return (
      <fieldset>
        <legend>{ legend }</legend>
        <ul className={ classNames }>
        {
          options.map((radio, idx) =>
            <RadioButton
              key={`radio-button-${idx}`}
              groupName={ groupName }
              value={ radio.value || idx }
              label={ radio.label }
              className={ radio.className }
              handleChange= { handleChange }
              selected={ selected }
              handleClick={ handleClick  }
              component={ optionComponent }
              selectedClassName={ selectedClassName }
            />
          )
        }
        </ul>
      </fieldset>
    )
  }
}

Group.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  groupName: PropTypes.string,
  legend: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.array,
  selectedClassName: PropTypes.string
}

Group.defaultProps = {
  handleChange: () => {},
  handleClick: () => {},
}

export default Group
