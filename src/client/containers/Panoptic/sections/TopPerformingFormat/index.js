import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/panoptic'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'

class TopPerformingFormat extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceDominantColorData(data)
  }

  render() {
    const {
      audienceDominantColorData: { data, loading, error },
    } = this.props

    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/Top-Performing-Formats-This-Week-By-CV-Score"
        title="Top Performing Formats This Week By CV Score"
        action={() => {}}
        filters={[
          {
            type: 'platform',
            selectKey: 'ACOT-ads',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'ACOT-wds',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceDominantColorData: makeSelectAudienceDominantColor(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingFormat)
