import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { defaults } from 'react-chartjs-2'
import Performance from './sections/Performance'
import DominantColor from './sections/DominantColor'
import ColorTemperature from './sections/ColorTemperature'
import ChangeOverTime from './sections/ChangeOverTime'
import GenderSection from './sections/Gender'
import AgeSlider from './sections/AgeSlider'
import RouterLoading from 'Components/RouterLoading'

import { actions, makeSelectPanoptic } from 'Reducers/panoptic'

class Audience extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getAudienceData();
  }

  render() {
    const { panoptic: { audienceData } } = this.props;

    if (!audienceData) return (<RouterLoading />)

    defaults.global.defaultFontFamily = 'ClanOT'
    return (
      <React.Fragment>
        <Performance />
        <AgeSlider />
        <GenderSection />
        <ColorTemperature />
        <ChangeOverTime />
        <DominantColor />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Audience)
