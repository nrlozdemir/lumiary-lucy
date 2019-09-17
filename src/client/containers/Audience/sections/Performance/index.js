import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudiencePerformance } from 'Reducers/audience'
import _ from 'lodash'
import { withTheme } from 'ThemeContext/withTheme'

class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: [0, 100],
      params: {},
    }
    this.updateSlider = _.debounce(this.updateSlider, 250)
    this.callBack = this.callBack.bind(this)
  }

  updateSlider(val) {
    const { params } = this.state
    const { type, getAudiencePerformanceData } = this.props
    getAudiencePerformanceData({
      min: val[0],
      max: val[1],
      ...params,
      type,
    })
  }

  callBack = (data, moduleKey) => {
    const { type, getAudiencePerformanceData } = this.props
    this.setState({
      params: data,
    })
    getAudiencePerformanceData({ ...data, type })
  }

  render() {
    const {
      audiencePerformanceData: { data, loading, error },
      themeContext: { colors },
    } = this.props

    return (
      <ModuleComponent
        isEmpty={
          !loading &&
          (_.isEmpty(data) ||
            (!!data &&
              Object.values(data).every((valArr) => {
                return (
                  Object.keys(valArr).length && valArr.every((v) => !v.value)
                )
              })))
        }
        props={this.props}
        state={this.state}
        colors={colors}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audiencePerformanceData: makeSelectAudiencePerformance(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Performance)
