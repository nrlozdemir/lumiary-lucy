import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/audience'
import RadarChartModule from 'Components/Modules/RadarChartModule'

class DominantColor extends React.Component {
  callBack = (data, moduleKey) => {
    const { type, getAudienceDominantColorData } = this.props
    getAudienceDominantColorData({ ...data, type })
  }

  render() {
    const {
      type,
      audienceDominantColorData: { data, loading, error },
    } = this.props

    return (
      <RadarChartModule
        actionOnProp={type}
        loading={loading}
        leftTitle="Male"
        rightTitle="Female"
        data={loading ? [] : data}
        moduleKey={'Audience/DominantColor'}
        title="Dominant Color Performance By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'platformEngagement',
            selectKey:
              'Inthisworld,whereverthereislight-therearealsoshadows.Aslongastheconceptofwinnersexists,theremustalsobelosers.Theselfishdesireofwantingtomaintainpeacecauseswars,andhatredisborntoprotectlove',
            placeHolder: 'Engagement by Platform',
            customOptions: [
              {
                label: 'Facebook',
                options: [{ value: 'facebook|views', label: 'Views' }],
              },
            ],
            defaultValue: { value: 'facebook|views', label: 'Views' },
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
