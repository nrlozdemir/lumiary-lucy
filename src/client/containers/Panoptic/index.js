import React from 'react'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import FilteringSection from './sections/FilteringSection'
import PacingCard from './sections/PacingCard'
import CompareShares from './sections/CompareShares'
import Cards from './sections/Cards'
import TopPerformingFormat from './sections/TopPerformingFormat'

/* eslint-disable react/prefer-stateless-function */
class Panoptic extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Cards />
        <TopPerformingFormat />
        <VideoReleasesBarChart />
        <FilteringSection />
        <PacingCard />
        <CompareShares />
      </React.Fragment>
    )
  }
}

export default Panoptic
