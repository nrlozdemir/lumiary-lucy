import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/audience'
import RadarChartModule from 'Components/Modules/RadarChartModule'

class DominantColor extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceDominantColorData(data)
  }

  render() {
    const {
      audienceDominantColorData: { data, loading, error },
    } = this.props

    return (
      <RadarChartModule
        loading={loading}
        leftTitle="Male"
        rightTitle="Female"
        data={loading ? {} : data}
        moduleKey={'Audience/DominantColor'}
        title="Dominant Color Performance By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'metric',
            selectKey: 'ADC-was',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'ADC-wds',
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

export default compose(withConnect)(DominantColor)
