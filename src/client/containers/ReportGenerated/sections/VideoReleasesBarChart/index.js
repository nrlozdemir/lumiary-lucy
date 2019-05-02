import React, { Component } from 'react'

import ModuleVideoReleasesBarChart from 'Components/Modules/VideoReleasesBarChart'

class VideoReleasesBarChart extends Component {
  callBack = (data, moduleKey) => {
    console.log(data)
  }

  render() {
    const {
      data
    } = this.props

    return (
      <ModuleVideoReleasesBarChart
        data={data}
        moduleKey={'ReportGenerated/VideoReleasesBarChart'}
        title="Video Releases vs Engagement"
        action={this.callBack}
        legend={(
          <div className='d-flex align-items-center justify-content-end'>
            <div className="d-flex align-items-center mr-32">
              <span className="blueDot" />
              <p>Likes</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className="redDot" />
              <p>Video Releases</p>
            </div>
          </div>
        )}
      />
    )
  }
}

export default VideoReleasesBarChart
