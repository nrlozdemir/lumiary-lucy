import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import style from './button.scss'

const Button = (props) => {
	const { className, disabled, extraClasses, label, onClick, type } = props

	return (
		<button
      className={ cx(style[className], extraClasses) }
      type={ type || 'submit' }
      disabled={ disabled }
      onClick={ onClick }
		>
			{ label }
    </button>
	)
}

export default Button
