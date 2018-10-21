'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router'
import { staticUrl } from 'Utils/globals'

import style from './styles.scss'

const Loading = (props) => {
	const { className, message, redirectMessage, redirectUrl, reloadMessage } = props

	return (
		<div className={ cx(style.loading, className) }>
      { !message && <img src={`${staticUrl}homepage/loading.svg`} alt="Loading" /> }
			{ message && <h3 className={ style.message }>{ message }</h3>}
			{ reloadMessage && <span className={ style.reloadMessage } onClick={() => window.location.reload() }>Click to refresh this page & try again.</span>}
			{ redirectMessage && redirectUrl &&
				<Link className={ style.reloadMessage } to={ redirectUrl }>{ redirectMessage }</Link>
			}
		</div>
	)
}

Loading.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string,
	redirectMessage: PropTypes.string,
	redirectURL: PropTypes.string,
	reloadMessage: PropTypes.bool
}

Loading.defaultProps = {
	className: null,
	message: null,
	redirectMessage: null,
	redirectURL: null,
	reloadMessage: false
}

export default Loading
