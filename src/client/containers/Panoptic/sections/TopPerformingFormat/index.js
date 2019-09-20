import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { makeSelectAuthProfile } from 'Reducers/auth'
import { actions, makeSelectTopPerformingFormat } from 'Reducers/panoptic'
import { isDataSetEmpty } from 'Utils/datasets'

import LineAndDoughnutChartModule from 'Components/Modules/LineAndDoughnutChartModule'
import { lineChartOptions } from './options'
import { isEmpty } from 'lodash'

class TopPerformingFormat extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getTopPerformingFormatData(data)
  }

  customCallbackFunc = () => console.log('Success')

  render() {
    const {
      topPerformingFormatData: {
        data,
        data: { lineChartData = {}, average = 0, properties = {}, platform },
        loading,
      },
    } = this.props

    const isLineChartEmpty = isDataSetEmpty(lineChartData)

    const hasNoData =
      !loading &&
      ((!!lineChartData && isLineChartEmpty) || isEmpty(data)) &&
      isEmpty(properties)

    return (
      <LineAndDoughnutChartModule
        moduleKey="Panoptic/TopPerformingPacingThisWeekByCVScore"
        title="Top Performing Pacing This Week By CV Score"
        action={this.callBack}
        lineChartData={!loading ? lineChartData : {}}
        lineChartOptions={lineChartOptions}
        customCallbackFunc={this.customCallbackFunc}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'PVR-asd',
            placeHolder: 'Engagement by Platform',
            removeAllPlatform: true,
            defaultValue: { value: 'facebook|views', label: 'Views' },
          },
        ]}
        platform={platform}
        properties={!loading ? properties : {}}
        average={average}
        isEmpty={hasNoData}
        loading={loading}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),
  topPerformingFormatData: makeSelectTopPerformingFormat(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(TopPerformingFormat)
