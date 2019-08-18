import React from 'react'
import Performance from './sections/Performance'
import DominantColor from './sections/DominantColor'
import ChangeOverTime from './sections/ChangeOverTime'
import GenderSection from './sections/Gender'
import AgeSlider from './sections/AgeSlider'
import ContentVitalityScore from './sections/ContentVitalityScore'

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

  renderAudienceToggle = () => {
    return (
      <button className={style.audienceToggle} onClick={this.toggleType}>
        fuckinkillme
      </button>
    )
  }

  render() {
    const { type } = this.state

    return (
      // context here is useless until react gets updated to 16.6
      // i just didnt want to write type={type} 4 every child
      //<AudienceContext.Provider value={type}>
      <div className={style.audienceContainer}>
        {this.renderAudienceToggle()}
        {/*<ContentVitalityScore type={type} />*/}
        <Performance type={type} />
        <AgeSlider type={type} />
        <GenderSection type={type} />
        <ChangeOverTime type={type} />
        <DominantColor type={type} />
      </div>
      //</AudienceContext.Provider>
    )
  }
}

export default Audience
