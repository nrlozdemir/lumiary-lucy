import React, { Component } from 'react'

//import ReportsHeader from './sections/ReportsHeader'

import CreatedFilters from './sections/CreatedFilters'
import Slider from './sections/Slider'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import TopVideosCard from './sections/TopVideosCard'
import PacingCard from './sections/PacingCard'
/* import EngagementByProperty from './sections/EngagementByProperty'
import ColorTemperature from './sections/ColorTemperature' */

class ReportGenerated extends Component {
  render() {
    /* const {
      generatedReport: {
        data: { topVideosOverTime, verticalStackedChartData, colorTempData },
      },
		} = this.props */

    const {
      match: { params },
    } = this.props

    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters />
        <Slider />
        <VideoReleasesBarChart />
        <TopVideosCard />
        <PacingCard reportId={params && params.id} />

        {/* verticalStackedChartData && (
          <EngagementByProperty
            data={verticalStackedChartData}
            handleSelectFilters={this.handleSelectFilters}
            selectDuration={selectDuration}
          />
        ) */}
        {/* colorTempData && (
          <ColorTemperature
            colorTempData={colorTempData}
            handleSelectFilters={this.handleSelectFilters}
            selectWarmColor={selectWarmColor}
          />
        )*/}
      </React.Fragment>
    )
  }
}

export default ReportGenerated
