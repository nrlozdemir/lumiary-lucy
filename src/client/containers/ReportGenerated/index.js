import React, { Component } from 'react'

//import ReportsHeader from './sections/ReportsHeader'

import CreatedFilters from './sections/CreatedFilters'
import Slider from './sections/Slider'
import VideoReleasesBarChart from './sections/VideoReleasesBarChart'
import TopVideosCard from './sections/TopVideosCard'
import PacingCard from './sections/PacingCard'
/* import EngagementByProperty from './sections/EngagementByProperty' */
import ColorTemperature from './sections/ColorTemperature'

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

    const id = params && params.id

    return (
      <React.Fragment>
        {/*<ReportsHeader />*/}
        <CreatedFilters reportId={id} />
        <Slider reportId={id} />
        <VideoReleasesBarChart reportId={id} />
        <TopVideosCard reportId={id} />
        <PacingCard reportId={id} />

        {/* <EngagementByProperty
          reportId={id}
          data={verticalStackedChartData}
          handleSelectFilters={this.handleSelectFilters}
          selectDuration={selectDuration}
        /> */}

        <ColorTemperature reportId={id} />
      </React.Fragment>
    )
  }
}

export default ReportGenerated
