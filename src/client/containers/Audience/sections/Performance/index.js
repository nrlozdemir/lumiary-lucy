import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudiencePerformance } from 'Reducers/audience'
import _ from 'lodash'
import { withTheme } from 'ThemeContext/withTheme'
import { ModuleComponent } from './ModuleComponent'

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
    return (
      <ModuleComponent
        props={this.props}
        state={this.state}
        moduleCallback={this.callBack}
        parentUpdateSlider={(val) => this.updateSlider(val)}
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
