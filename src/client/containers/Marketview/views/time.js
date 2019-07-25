/**
 *
 * Marketview Time
 *
 */

import React from 'react'

import DaySelection from 'Containers/Marketview/sections/detail/DaySelection'
import Slider from '../sections/detail/Slider'
import TopVideosOverTime from '../sections/detail/TopVideosOverTime'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'

/* eslint-disable react/prefer-stateless-function */
export class Time extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDay: 'monday',
    }
  }

  changeActiveDay(day) {
    this.setState({ activeDay: day })
  }

  render() {
    const { activeDay } = this.state
    return (
      <React.Fragment>
        <DaySelection
          onDayChange={(day) => this.changeActiveDay(day)}
          activeDay={activeDay}
        />
        <Slider
          moduleKey="MarketView/Time/Slider"
          title={`Top Performing ${activeDay
            .charAt(0)
            .toUpperCase()}${activeDay.slice(1)} Videos`}
          activeDay={activeDay}
          filters={[
            {
              type: 'metric',
              selectKey: 'Mwplt-metric',
              placeHolder: 'metric',
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
          title="Similar Properties Of Top Videos"
          activeDay={activeDay}
          filters={[
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
              type: 'property',
              selectKey: 'property',
              placeHolder: 'property',
            },
            {
              type: 'dateRange',
              selectKey: 'Mwvlt-date',
              placeHolder: 'Date',
            },
          ]}
          container="time"
        />
      </React.Fragment>
    )
  }
}

Time.propTypes = {}

export default Time
