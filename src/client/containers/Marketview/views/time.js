/**
 *
 * Marketview Time
 *
 */

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import { makeSelectSelectFilters } from 'Reducers/selectFilters'

import DaySelection from 'Containers/Marketview/sections/detail/DaySelection'
import Slider from '../sections/detail/Slider'
import TopVideosOverTime from '../sections/detail/TopVideosOverTime'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'
import CVScoresComparison from '../sections/detail/CVScoresComparison'

/* eslint-disable react/prefer-stateless-function */
export class Time extends React.Component {

  render() {
    const today = moment().format('dddd')
    const selectDayKey = 'Mwplt-onDay'
    const { selectFilters = {} } = this.props
    const { values = {} } = selectFilters
    const { ['MarketView/Time/Slider'] : dateValue = {} } = values
    const { [selectDayKey] : selectedDayKey = {} } = dateValue
    const { value : selectedDay = '' } = selectedDayKey
    const { value : selectedDayValue = '' } = selectedDay
    const currentDay = selectedDayValue || today
    return (
      <React.Fragment>
        {/* <DaySelection
          onDayChange={(day) => this.changeActiveDay(day)}
          activeDay={activeDay}
        /> */}
        <Slider
          moduleKey="MarketView/Time/Slider"
          title={`Top Performing ${
            currentDay.charAt(0)
            .toUpperCase()}${currentDay.slice(1)} Videos`}
          filters={[
            {
              type: 'metric',
              selectKey: 'Mwplt-metric',
              placeHolder: 'metric',
            },
            {
              type: 'onDay',
              selectKey: selectDayKey,
              placeHolder: 'onDay',
            },
            {
              type: 'dateRange',
              selectKey: 'Mwplt-date',
              placeHolder: 'Date',
            },
          ]}
          container="time"
        />
        <TopSimilarProperties
          moduleKey="MarketView/Time/SimilarProperties"
          title="Top Similar Properties Of Top Videos"
          filters={[
            {
              type: 'onDay',
              selectKey: 'tpsmlr-onDay',
              placeHolder: 'onDay',
            },
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
          container="time"
        />
        <TopVideosOverTime
          moduleKey="MarketView/Time/TopVideosCard"
          title="Top Performing Property Across All Days Of The"
          filters={[
            {
              type: 'onDay',
              selectKey: 'tpvdsovrtm-onDay',
              placeHolder: 'onDay',
            },
            {
              type: 'property',
              selectKey: 'property',
              placeHolder: 'property',
            },
          ]}
          container="time"
        />
      </React.Fragment>
    )

    // return (
    //   <React.Fragment>
    //     <CVScoresComparison
    //       moduleKey="MarketView/Time/CVScoreComparison"
    //       title="CV Score By Videos Produced Comparison"
    //       filters={[
    //         {
    //           type: 'platform',
    //           selectKey: 'MVTimeCV-platform',
    //           placeHolder: 'Platform',
    //         },
    //         {
    //           type: 'onDay',
    //           selectKey: 'MVTimeCV-onDay',
    //           placeHolder: 'Day',
    //         },
    //         {
    //           type: 'dateRange',
    //           selectKey: 'MVTimeCV-date',
    //           placeHolder: 'Date',
    //         },
    //       ]}
    //       container="time"
    //     />
    //   </React.Fragment>
    // )
  }
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
})

const withConnect = connect(
  mapStateToProps,
  null
)

Time.propTypes = {}

export default compose(withConnect)(Time)
