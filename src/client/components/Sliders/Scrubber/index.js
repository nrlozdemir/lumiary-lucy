import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import style from './style.scss'

const propTypes = {}
const defaultProps = {
	width: 1160,
	height: 342,
	arrows: false,
	scrubberHeight: 14
}

const LeftArrow = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
    <path fill="#505050" fill-rule="evenodd" d="M7.863 10L0 4.993 7.843 0l1.12.713-6.005 3.824.004-.003-.721.46L9 9.296 7.863 10z"/>
  </svg>)
}

const RightArrow = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
    <path fill="#505050" fill-rule="evenodd" d="M1.137 10L9 4.993 1.157 0 .037.713l6.005 3.824-.004-.003.721.46L0 9.296 1.137 10z"/>
  </svg>)
}

export default class Scrubber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderTrackHorizontal = this.renderTrackHorizontal.bind(this);
    this.renderThumbHorizontal = this.renderThumbHorizontal.bind(this);
  }

  handleUpdate(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderTrackHorizontal(props) {
    const inlineStyle = {
      right: 2,
      bottom: 2,
      left: 2,
      borderRadius: Math.floor(parseInt(props.scrubberHeight) / 2),
      boxShadow: '0 2px 6px 0 #e8ecf0',
      border: '1px solid #c6c9d7',
			background: "#e8ecf0",
    }

    return <div className={style.trackHorizontal} style={inlineStyle} />
  }

  renderThumbHorizontal(props) {
    const inlineStyle = {
      borderRadius: 'inherit',
      background: "rgba(255, 255, 255, 0.9)",
      border: '1px solid #c6c9d7',
      height: props.scrubberHeight,
    }

    return (<div className={style.thumbHorizontal} style={inlineStyle}>
      {props.arrows && (<div className={style.arrowContainer}>
        <div className={style.leftArrows}>
          <LeftArrow />
          <LeftArrow />
        </div>
        <div className={style.rightArrows}>
          <RightArrow />
          <RightArrow />
        </div>
      </div>)}
    </div>)
}

  render() {
		const { horizontal, width, height, children, arrows } = this.props
    return (
			horizontal && (<Scrollbars
        renderTrackHorizontal={ () => this.renderTrackHorizontal(this.props) }
        renderThumbHorizontal={ () => this.renderThumbHorizontal(this.props) }
        style={{ width: width, height: height }}>
        {children}
      </Scrollbars>)
    );
  }
}

Scrubber.propTypes = propTypes;
Scrubber.defaultProps = defaultProps;
