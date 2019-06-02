/**
 *
 * Marketview Competitor
 *
 */

import React from 'react'
import Slider from '../sections/detail/Slider'
import TopVideosOverTime from '../sections/detail/TopVideosOverTime'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'
import TopPerformingProperty from '../sections/detail/TopPerformingProperty'

/* eslint-disable react/prefer-stateless-function */
export class Competitor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="grid-collapse">
          <Slider
            moduleKey="MarketView/CompetitorSlider"
            title="Top Performing Competitor Videos"
            filters={[
              {
                type: 'metric',
                selectKey: 'Mwplt-engagement',
                placeHolder: 'Engagement',
              },
              {
                type: 'dateRange',
                selectKey: 'Mwplt-date',
                placeHolder: 'Date',
              },
            ]}
            container="competitor"
          />
          <TopVideosOverTime
            moduleKey="MarketView/CompetitorTopVideosOverTime"
            title="Top Videos Over Time By Competitor"
            filters={[
              {
                type: 'property',
                selectKey: 'property',
                placeHolder: 'property',
              },
              {
                type: 'metric',
                selectKey: 'engagement',
                placeHolder: 'engagement',
              },
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
            references={[
              {
                className: 'bg-cool-blue',
                text: 'Barstool Sports',
              },
              {
                className: 'bg-lighter-purple',
                text: 'SB Nation',
              },
              {
                className: 'bg-coral-pink',
                text: 'ESPN',
              },
              {
                className: 'bg-cool-grey',
                text: 'Scout Media',
              },
              {
                className: 'bg-dusk"',
                text: 'Fanside',
              },
            ]}
            container="competitor"
          />
          <TopSimilarProperties
            moduleKey="MarketView/CompetitorSimilarProperties"
            title="Similar Properties Of Top Videos"
            filters={[
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
            container="competitor"
          />
          <TopPerformingProperty
            moduleKey="MarketView/topPerformingPropertiesByCompetitors"
            title="Top Performing Property, Pacing, Across All Competitors"
            filters={[
              {
                type: 'dateRange',
                selectKey: 'dateRange',
                placeHolder: 'dateRange',
              },
            ]}
            container="competitor"
          />
        </div>
      </React.Fragment>
    )
  }
}

export default Competitor
