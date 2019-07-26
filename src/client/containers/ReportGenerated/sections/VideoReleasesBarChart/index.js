import React from 'react'
import VideoReleasesBarChartModule from 'Components/Modules/VideoReleasesBarChartModule'
import { isDataSetEmpty } from 'Utils/datasets'
import { isEmpty, isEqual } from 'lodash'

class VideoReleasesBarChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      data: { data },
    } = this.props
    const {
      data: { data: nextData },
    } = nextProps

    return data && !isEqual(JSON.stringify(data), JSON.stringify(nextData))
  }

  componentDidMount() {
    const { action, report } = this.props
    action({ report })
  }

  render() {
    const {
      data: { data, loading },
    } = this.props

    const isEmpty =
      !loading &&
      (!data ||
        (!!data &&
          (!data.length ||
            (!!data.length &&
              data.every((dataset) => isDataSetEmpty(dataset))))))

    return (
      <VideoReleasesBarChartModule
        data={data}
        moduleKey={'BrandInsights/VideoReleasesBarChart'}
        title="Video Releases vs Engagement"
        legend={[
          { label: 'Videos', color: 'cool-blue' },
          { label: 'Engagement', color: 'coral-pink' },
        ]}
        legendEnd={true}
        isEmpty={isEmpty}
        loading={loading}
      />
    )
  }
}

export default VideoReleasesBarChart
