import React from 'react'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import ColorTemperature from './sections/ColorTemperature'
import FilteringSection from './sections/FilteringSection'
import PacingCard from './sections/PacingCard'
import CompareShares from './sections/CompareShares'
import Cards from './sections/Cards'
import style from './style.scss'

/* eslint-disable react/prefer-stateless-function */
const Panoptic = () => {
  return (
    <React.Fragment>
      <div className="grid-container col-12">
        <div className={style.alignTabs}>

        </div>
      </div>
      <Cards />
      <VideoReleasesBarChart />
      <ColorTemperature />
      <FilteringSection />
      <PacingCard />
      <CompareShares />
    </React.Fragment>
  )
}

export default Panoptic
