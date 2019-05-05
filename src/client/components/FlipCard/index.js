import React from 'react'
import classnames from 'classnames'
import styles from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

/*
Example Usage:
<FlipCard width={300} height={250}>
  <h1>This is the front</h1>
  <h2>This is the back</h2>
</FlipCard>

Also take the following props:
containerClassName, flipperClassName, frontClassName, backClassName
*/

const defaultProps = {
  width: 260,
  height: 134,
}

class FlipCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { children, width, height } = this.props
    const { textColor, moduleBackground } = this.props.themeContext.colors

    const themeStyle = {
      color: textColor,
      background: moduleBackground,
    }

    const containerClassName = classnames(styles.flipContainer, 'col-3 ml-0')

    const flipperClassName = styles.flipper
    const frontClassName = styles.front
    const backClassName = styles.back

    return (
      <React.Fragment>
        <div
          className={containerClassName}
          style={{
            width: width + 'px',
            height: height + 'px',
          }}
        >
          <div className={flipperClassName}>
            <div className={frontClassName} style={{ ...themeStyle }}>
              {children && children[0]}
            </div>
            <div className={backClassName} style={{ ...themeStyle }}>
              {children && children[1]}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

FlipCard.defaultProps = defaultProps

export default withTheme(FlipCard)
