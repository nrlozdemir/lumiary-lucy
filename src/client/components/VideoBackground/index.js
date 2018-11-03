import React from 'react'
import cx from 'classnames'

import style from './styles.scss'

const VideoBackground = ({ src, children, className }) => {
	
	return(
	  <div className={ cx(style.videoBackground, className) } style={{backgroundImage: `url(${src})`}}>
	    { children }
	  </div>
	)
}

VideoBackground.defaultProps = {
  className: ''
};

export default VideoBackground
