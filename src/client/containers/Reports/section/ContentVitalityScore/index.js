import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions,
  makeSelectReportsContentVitalityScore,
} from 'Reducers/reports'

import ContentVitalityScoreModule from 'Components/Modules/ContentVitalityScoreModule'

class ContentVitalityScore extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getContentVitalityScoreData(data)
  }

  render() {
    const {
      contentVitalityScoreData: { data, loading, error },
    } = this.props

    return (
      <ContentVitalityScoreModule
        data={data}
        moduleKey={'Reports/ContentVitalityScore'}
        title="Content Vitality Score Based On Audience"
        action={this.callBack}
        filters={[
          {
            type: 'platform',
            selectKey: 'RCVS-ads',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'RCVS-wds',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  contentVitalityScoreData: makeSelectReportsContentVitalityScore(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ContentVitalityScore)
