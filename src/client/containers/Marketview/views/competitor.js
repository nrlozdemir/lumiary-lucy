/**
 *
 * Marketview Competitor
 *
 */

import React from 'react'
// import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
// import { compose, bindActionCreators } from 'redux'
// import { actions, makeSelectMarketview } from 'Reducers/marketview'

import Slider from '../sections/detail/Slider'
// import TopSimilarPropertiesModule from 'Components/Modules/TopSimilarPropertiesModule'
// import BarChartModule from 'Components/Modules/BarChartModule'
import TopVideosOverTime from '../sections/detail/TopVideosOverTime'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'

// import style from '../style.scss'
// import { withTheme } from 'ThemeContext/withTheme'

// const chartTickOptions = {
//   stepSize: 250000,
//   min: 0,
//   max: 1000000,
//   callback(value) {
//     if (value < 1000) {
//       return value
//     } else if (value < 1000000) {
//       return `${Math.round(value / 1000)}k`
//     }
//     return `${Math.round((value * 100) / 1000000) / 100}m`
//   },
// }

/* eslint-disable react/prefer-stateless-function */
export class Competitor extends React.Component {
  // getSimilarProperties = (data) => {
  //   const {
  //     themeContext: { colors },
  //   } = this.props
  //   console.log(data)
  //   this.props.getSimilarPropertiesRequest({
  //     date: data,
  //     themeColors: colors,
  //   })
  // }

  // getTopPerformingPropertiesByCompetitors = (data) => {
  //   this.props.getTopPerformingPropertiesByCompetitorsRequest(data)
  // }

  render() {
    return (
      <React.Fragment>
        <div className="grid-collapse">
          <Slider />
          <TopVideosOverTime />
          <TopSimilarProperties />
          {/* <TopSimilarPropertiesModule
            moduleKey="MarketView/TopSimilarPropertiesModule"
            data={similarProperties}
            title="Similar Properties Of Top Videos"
            action={this.getSimilarProperties}
            presentWithDoughnut
            filters={[
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
          />
          <BarChartModule
            moduleKey="MarketView/topPerformingPropertiesByCompetitors"
            containerClass={style.detailTopPerformingPropertyContainer}
            barData={topPerformingPropertiesByCompetitorsData}
            tickOptions={chartTickOptions}
            title="Top Performing Property, Pacing, Across All Competitors"
            height={50}
            action={this.getTopPerformingPropertiesByCompetitors}
            filters={[
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
            references={[
              {
                className: 'bg-cool-blue',
                text: 'Fast',
              },
              {
                className: 'bg-lighter-purple',
                text: 'Medium',
              },
              {
                className: 'bg-coral-pink',
                text: 'Slow',
              },
              {
                className: 'bg-cool-grey',
                text: 'Slowest',
              },
            ]}
          /> */}
        </div>
      </React.Fragment>
    )
  }
}

// Competitor.propTypes = {}

// const mapStateToProps = createStructuredSelector({
//   marketview: makeSelectMarketview(),
// })

// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )

// export default compose(
//   withConnect,
//   withTheme
// )(Competitor)

export default Competitor
