import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import style from './styles.scss'

const Input = (props) => {
  const {
    className, counterClass, filledClass, id, input, label, maxLength, onEnter, placeholder, type,
    meta: { asyncValidating, dirty, error, touched, warning },
  } = props

  const classNames = cx({
    asyncValidating: asyncValidating,
    valid: touched && !error,
    [style.invalid]: touched && error,
    [style.withCounter]: !!maxLength
  })

  const counterClasses = cx(
    style.counter,
    style[counterClass]
  )

  return (
    <div className={ classNames } >
      <input { ...input } id={ id } className={ cx(style.main, { [filledClass]: dirty }) } placeholder={ placeholder } type={ type } onKeyPress={ onEnter }/>
      { touched &&
        (
          ( error && <span className={ style.error }> { error } </span> ) ||
          ( warning && <span className="warning"> { warning } </span> )
        )
      }

      { maxLength ?
        <span className={ counterClasses }>{input.value.length || 0 }/{maxLength}</span>
        : null
      }

    </div>
  )
}

Input.propTypes = {
	className: PropTypes.string,
	filledClass: PropTypes.string,
	id: PropTypes.string,
	input: PropTypes.object,
	label: PropTypes.string,
	meta: PropTypes.object,
	onEnter: PropTypes.func,
	placeholder: PropTypes.string,
	type: PropTypes.string
}

Input.defaultProps = {
	onEnter: () => {}
}

export default Input
