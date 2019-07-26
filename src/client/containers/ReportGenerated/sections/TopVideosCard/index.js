import React from 'react'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'
import { isEmpty, isEqual } from 'lodash'

class TopVideosCard extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      data: { data, loading },
    } = this.props
    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    return (
      (data && !isEqual(JSON.stringify(data), JSON.stringify(nextData))) ||
      loading !== nextLoading
    )
  }

  callBack = (data) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading },
    } = this.props

    return (
      <TopVideosCardModule
        loading={loading}
        chartData={!loading ? data : {}}
        height={150}
        moduleKey="BrandInsights/TopVideosCard"
        title="Top Videos Over Time By All Platforms"
        action={this.callBack}
        xGridDisplay
        filters={[
          {
            type: 'property',
            selectKey: 'RTVC-asd',
            placeHolder: 'Resolution',
          },
        ]}
        references={[
          {
            className: 'bg-cool-blue',
            text: 'Facebook',
          },
          {
            className: 'bg-lighter-purple',
            text: 'Instagram',
          },
          {
            className: 'bg-coral-pink',
            text: 'Twitter',
          },
          {
            className: 'bg-cool-grey',
            text: 'YouTube',
          },
        ]}
      />
    )
  }
}

export default TopVideosCard
