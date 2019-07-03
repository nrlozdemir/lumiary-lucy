import React from 'react'
import TopVideosCardModule from 'Components/Modules/TopVideosCardModule'

class TopVideosCard extends React.Component {
  callBack = (data) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading },
      infoText,
    } = this.props

    return (
      <TopVideosCardModule
        loading={loading}
        chartData={data}
        height={150}
        moduleKey="Reports/TopVideosCardModule"
        title="Top Videos Over Time By All Platforms"
        action={this.callBack}
        infoText={infoText}
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
