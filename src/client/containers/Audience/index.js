import React from 'react'
import Performance from './sections/Performance'
import DominantColor from './sections/DominantColor'
import ChangeOverTime from './sections/ChangeOverTime'
import GenderSection from './sections/Gender'
import AgeSlider from './sections/AgeSlider'
import ContentVitalityScore from './sections/ContentVitalityScore'
import { ThemeContext } from 'ThemeContext/themeContext'
import cx from 'classnames'

import style from './style.scss'

const defaultType = 'organic'

//export const AudienceContext = React.createContext(defaultType)

class Audience extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      type: defaultType,
    }
  }

  toggleType = () => {
    this.setState((state) => ({
      type: state.type === 'paid' ? 'organic' : 'paid',
    }))
  }

  renderAudienceToggle = (colors) => {
    const { type } = this.state

    return (
      <div>
        <label
          className={style.audienceToggle}
          style={{ border: `1px solid ${colors.audienceToggleBorder}` }}
        >
          <input type="checkbox" onClick={this.toggleType} />
          <span
            className={style.audienceToggle_slider}
            style={{ backgroundColor: colors.audienceToggleBGColor }}
          >
            <p
              style={{
                borderRight: `1px solid ${colors.audienceToggleBorder}`,
                color:
                  type === 'organic'
                    ? colors.audienceToggleActiveTextColor
                    : colors.audienceToggleInactiveTextColor,
              }}
            >
              Organic
            </p>
            <p
              style={{
                color:
                  type === 'paid'
                    ? colors.audienceToggleActiveTextColor
                    : colors.audienceToggleInactiveTextColor,
              }}
            >
              Paid
            </p>
          </span>
        </label>
      </div>
    )
  }

  render() {
    const { type } = this.state

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <React.Fragment>
            <div
              className={cx(
                'grid-container',
                'col-12',
                style.audienceToggle_container
              )}
            >
              {this.renderAudienceToggle(colors)}
            </div>
            {/*<ContentVitalityScore type={type} />*/}
            <GenderSection type={type} />
            <Performance type={type} />
            <AgeSlider type={type} />
            <ChangeOverTime type={type} />
            <DominantColor type={type} />
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Audience
