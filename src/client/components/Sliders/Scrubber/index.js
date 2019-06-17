import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './style.scss'

const propTypes = {}
const defaultProps = {
  width: 1160,
  height: 342,
  arrows: false,
  scrubberHeight: 14,
  viewBordered: false,
  verticalDisabled: true,
  marks: false,
  totalWidth: 1160
}

const LeftArrow = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
    <path fill="#505050" fillRule="evenodd" d="M7.863 10L0 4.993 7.843 0l1.12.713-6.005 3.824.004-.003-.721.46L9 9.296 7.863 10z"/>
  </svg>)
}

const RightArrow = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
    <path fill="#505050" fillRule="evenodd" d="M1.137 10L9 4.993 1.157 0 .037.713l6.005 3.824-.004-.003.721.46L0 9.296 1.137 10z"/>
  </svg>)
}

export default class Scrubber extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleUpdate = this.handleUpdate.bind(this)
    this.renderTrackHorizontal = this.renderTrackHorizontal.bind(this)
    this.renderThumbHorizontal = this.renderThumbHorizontal.bind(this)
    this.renderTrackVertical = this.renderTrackVertical.bind(this)
    this.renderThumbVertical = this.renderThumbVertical.bind(this)
    this.renderView = this.renderView.bind(this)
  }

  markClick(e, totalWidth) {
    console.log(totalWidth * e * 10 / 100)
    if (e * 10 === 0) {
      this.scrollbars.scrollLeft(0)
    } else if (e * 10 === 100) {
      this.scrollbars.scrollLeft(totalWidth)
    } else {
      this.scrollbars.scrollLeft(totalWidth * e * 6.5 / 100)
    }
  }

  handleUpdate(values) {
    const { top } = values
    this.setState({ top })
  }

  renderTrackVertical(props) {
    return (<div />)
  }

  renderThumbVertical(props) {
    return (<div />)
  }

  renderTrackHorizontal(props) {
    const inlineStyle = {
      right: 1,
      bottom: 2,
      left: 0,
      borderRadius: Math.floor(parseInt(props.scrubberHeight) / 2),
      boxShadow: '0 2px 6px 0 #e8ecf0',
      border: '1px solid #c6c9d7',
      background: "#e8ecf0",
    }

    return <div className={styles.trackHorizontal} style={inlineStyle} />
  }

  renderThumbHorizontal(props) {
    const inlineStyle = {
      borderRadius: 'inherit',
      background: "rgba(255, 255, 255, 0.9)",
      border: '1px solid #c6c9d7',
      height: props.scrubberHeight,
      zIndex: 4
    }

    return (<div className={styles.thumbHorizontal} style={inlineStyle}>
      {props.arrows && (
        <div className={styles.arrowContainer}>
          <div className={styles.leftArrows}>
            <LeftArrow />
            <LeftArrow />
          </div>
          <div className={styles.rightArrows}>
            <RightArrow />
            <RightArrow />
          </div>
        </div>
        )
      }
    </div>
    )
  }

  renderView({ style, ...props }) {

    const { viewBordered, verticalDisabled } = this.props
    const customStyle = {
    }
    const customClass = classnames({
      [styles.viewBordered]: viewBordered
    })

    return (
      <div className={customClass} {...props} style={{ ...style, ...customStyle }} />
    )
  }

  render() {
    const { 
      horizontal, 
      vertical, 
      width, 
      height, 
      children, 
      arrows, 
      viewBordered, 
      verticalDisabled, 
      marks,
      totalWidth
    } = this.props
    return (
      <React.Fragment>
        {horizontal ? (
          <Scrollbars universal
          ref={el => this.scrollbars = el}
          renderTrackHorizontal={ () => this.renderTrackHorizontal(this.props) }
          renderThumbHorizontal={ () => this.renderThumbHorizontal(this.props) }
          renderTrackVertical={ props => <div {...props} className={styles.emptyScrollBar} /> }
          renderThumbVertical={ props => <div {...props} className={styles.emptyScrollBar} /> }
          renderView={ this.renderView }
          style={{ width: width, height: height }}>
          {children}
          </Scrollbars>
          
        ) : (
          <Scrollbars universal
            ref={el => this.scrollbars = el}
            renderTrackHorizontal={ props => <div {...props} className={styles.emptyScrollBar} /> }
            renderThumbHorizontal={ props => <div {...props} className={styles.emptyScrollBar} /> }
            style={{ width: width, height: height }}>
            {children}
          </Scrollbars>
        )}
        {marks && (
          <div className={styles.ticksWrapper}>
            <div className={styles.ticks}>
              {Object.keys(marks).map((m, i) => (
                <p key={`mark-${i}`} onClick={() => this.markClick(i, totalWidth)} className={styles.tick}>
                  {marks[m].value}
                </p>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

Scrubber.propTypes = propTypes
Scrubber.defaultProps = defaultProps
