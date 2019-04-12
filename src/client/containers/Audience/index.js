import React from 'react'
import Performance from './sections/Performance'
import DominantColor from './sections/DominantColor'
import ColorTemperature from './sections/ColorTemperature'
import ChangeOverTime from './sections/ChangeOverTime'
import GenderSection from './sections/Gender'
import AgeSlider from './sections/AgeSlider'
import ContentVitalityScore from './sections/ContentVitalityScore'

const Audience = () => {
  return (
    <React.Fragment>
			<ContentVitalityScore />
      <Performance />
      <AgeSlider />
      <GenderSection />
      <ColorTemperature />
      <ChangeOverTime />
      <DominantColor />
    </React.Fragment>
  )
}

export default Audience
