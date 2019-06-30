import React from 'react'
import RadarChartModule from 'Components/Modules/RadarChartModule'

class ColorComparison extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading, error },
    } = this.props

    return (
      <RadarChartModule
        leftTitle={data && data.length > 0 && data[0] && data[0].type}
        rightTitle={data && data.length > 0 && data[1] && data[1].type}
        data={data}
        moduleKey={'Reports/ColorComparison'}
        title="Video Library Color Comparison"
        action={this.callBack}
        loading={loading}
        filters={[
          {
            type: 'metric',
            selectKey: 'RVC-was',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

export default ColorComparison
