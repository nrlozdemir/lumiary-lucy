import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { defaults } from 'react-chartjs-2'
import { Header } from './sections/Header'
import { Performance } from './sections/Performance'
import { DominantColor } from './sections/DominantColor'
import { ColorTemperature } from './sections/ColorTemperature'
import { ChangeOverTime } from './sections/ChangeOverTime'
import GenderSection from './sections/Gender'

export class Audience extends React.Component {
  render() {
    defaults.global.defaultFontFamily = 'ClanOT'
    return (
      <React.Fragment>
        <Header />
        <Performance />
        <GenderSection />
        <ColorTemperature />
        <ChangeOverTime />
        <DominantColor />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Audience)
