import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import { withTheme } from 'ThemeContext/withTheme'
import styles from './style.scss'

const propTypes = {}
const defaultProps = {
  width: 1160,
  height: 342,
  arrows: false,
  scrubberWidth: 'auto',
  scrubberHeight: 14,
  viewBordered: false,
  verticalDisabled: true,
  marks: false,
  totalWidth: 1160,
  scrubberCustomClass: {},
  scrubberIsDot: false,
  isEmpty: false,
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

class Scrubber extends React.Component {
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
    const {
      colors
    } = this.props.themeContext

    if( ! props.scrubberIsDot) {
      const inlineStyle = {
        right: 1,
        bottom: 2,
        left: 0,
        borderRadius: Math.floor(parseInt(props.scrubberHeight) / 2),
        boxShadow: `0 2px 6px 0 ${colors.trackShadowColor}`,
        border: `1px solid ${colors.trackBorderColor}`,
        background: colors.trackBackgroundColor,
      }
      return <div className={styles.trackHorizontal} style={inlineStyle} />
    } else {
      const inlineStyle = {
        right: 1,
        bottom: 2,
        left: 0,
        borderRadius: 16,
        background: colors.dotTrackBackgroundColor,
        margin: '6px 0px 6px 0px',
        height: 4
      }
      return <div className={styles.trackHorizontal} style={inlineStyle} />
    }
  }

  renderThumbHorizontal(props) {
    const {
      colors
    } = this.props.themeContext
    if( ! props.scrubberIsDot) {
      const inlineStyle = {
        borderRadius: 'inherit',
        background: colors.thumbBackgroundColor,
        border: `1px solid ${colors.thumbBorderColor}`,
        height: props.scrubberHeight,
        zIndex: 4
      }
      
      if (props.isEmpty) {
        return (
        <div 
          className={styles.thumbHorizontal} 
          style={{
            ...inlineStyle,
            width: '0px',
            border: 'none'
          }}>
        </div>)
      }
      
      return (
        <div className={styles.thumbHorizontal} style={inlineStyle}>
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
    } else {
      const inlineStyle = {
        background: colors.dotThumbBackgroundColor,
        width: 16,
        height: 16,
        borderRadius: 16,
        zIndex: 4,
        top: -7,
        boxShadow: `0 2px 6px 0 ${colors.dotThumbShadowColor}`,
        position: 'absolute'
      }

      return (
        <div className={styles.thumbHorizontal} style={inlineStyle}>
        </div>
      )
    }
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
      totalWidth,
      scrubberIsDot,
      scrubberWidth,
      scrubberHeight,
      scrubberDotClassname,
      viewportBackgroundColor
    } = this.props

    let horizontalProps = {}
    if (scrubberIsDot === true) {
      horizontalProps.thumbSize = scrubberWidth
    }
    
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
            {...horizontalProps} 
            style={{ width: width, height: height, backgroundColor: viewportBackgroundColor }}
          >
            {children}
          </Scrollbars>
          
        ) : (
          <Scrollbars universal
            ref={el => this.scrollbars = el}
            renderTrackHorizontal={ props => <div {...props} className={styles.emptyScrollBar} /> }
            renderThumbHorizontal={ props => <div {...props} className={styles.emptyScrollBar} /> }
            style={{ width: width, height: height }}
          >
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

export default withTheme(Scrubber)

Scrubber.propTypes = propTypes
Scrubber.defaultProps = defaultProps
