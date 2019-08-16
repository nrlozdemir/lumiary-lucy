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
import CVScoresComparison from '../sections/detail/CVScoresComparison'

/* eslint-disable react/prefer-stateless-function */
export class Competitor extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Slider
          moduleKey="MarketView/Competitor/Slider"
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
          moduleKey="MarketView/Competitor/TopVideosOverTime"
          title="Top Videos Over Time By Competitor"
          filters={[
            {
              type: 'propertyEngagement',
              selectKey: 'propertyEngagement',
              placeHolder: 'Engagement by property',
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
          moduleKey="MarketView/Competitor/TopSimilarProperties"
          title="Top Similar Properties Of Top Videos"
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
          moduleKey="MarketView/Competitor/TopPerformingProperty"
          filters={[
            {
              type: 'property',
              selectKey: 'sakdlfjlasdjf-property',
              placeHolder: 'Property',
            },
          ]}
          container="competitor"
        />
      </React.Fragment>
    )

    // return (
    //   <React.Fragment>
    //     <CVScoresComparison
    //       moduleKey="MarketView/Competitor/CVScoreComparison"
    //       title="CV Score By Videos Produced Comparison"
    //       filters={[
    //         {
    //           type: 'brand',
    //           selectKey: 'MVCompetitor-brand',
    //           placeHolder: 'Brand',
    //         },
    //         {
    //           type: 'platform',
    //           selectKey: 'MVCompetitor-platform',
    //           placeHolder: 'Platform',
    //         },
    //         {
    //           type: 'dateRange',
    //           selectKey: 'MVCompetitor-dateRange',
    //           placeHolder: 'Date',
    //         },
    //       ]}
    //       container="competitor"
    //     />
    //   </React.Fragment>
    // )
  }
}

export default Competitor
