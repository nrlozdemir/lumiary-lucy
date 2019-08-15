/**
 *
 * Marketview Platform
 *
 */

import React from 'react'
import Slider from '../sections/detail/Slider'
import TopVideosOverTime from '../sections/detail/TopVideosOverTime'
import TopSimilarProperties from '../sections/detail/TopSimilarProperties'
import TopPerformingProperty from '../sections/detail/TopPerformingProperty'
import CVScoresComparison from '../sections/detail/CVScoresComparison'

/* eslint-disable react/prefer-stateless-function */
export class Platform extends React.Component {
  render() {
    // return (
    //   <React.Fragment>
    //     <Slider
    //       title="Top Performing Videos By Platform"
    //       moduleKey="MarketView/Platform/Slider"
    //       filters={[
    //         {
    //           type: 'platformEngagement',
    //           selectKey: 'mwplttpaap-plateng',
    //           placeHolder: 'Engagement by Platform',
    //         },
    //         {
    //           type: 'dateRange',
    //           selectKey: 'dateRange',
    //           placeHolder: 'dateRange',
    //         },
    //       ]}
    //       container="platform"
    //     />
    //     <TopVideosOverTime
    //       moduleKey="MarketView/Platform/TopVideosOverTime"
    //       title="Top Videos Over Time By Platform"
    //       filters={[
    //         {
    //           type: 'property',
    //           selectKey: 'mwplttpaap-property',
    //           placeHolder: 'Property',
    //         },
    //         {
    //           type: 'metric',
    //           selectKey: 'mwplttpaap-engagement',
    //           placeHolder: 'Engagement',
    //         },
    //         {
    //           type: 'dateRange',
    //           selectKey: 'dateRange',
    //           placeHolder: 'dateRange',
    //         },
    //       ]}
    //       container="platform"
    //       references={[
    //         {
    //           className: 'bg-cool-blue',
    //           text: 'Facebook',
    //         },
    //         {
    //           className: 'bg-lighter-purple',
    //           text: 'Instagram',
    //         },
    //         {
    //           className: 'bg-coral-pink',
    //           text: 'Twitter',
    //         },
    //         {
    //           className: 'bg-cool-grey',
    //           text: 'Youtube',
    //         },
    //       ]}
    //       container="platform"
    //     />
    //     <TopSimilarProperties
    //       moduleKey="MarketView/Platform/TopSimilarProperties"
    //       title="Top Similar Properties Of Top Videos"
    //       action={this.getSimilarProperties}
    //       filters={[
    //         {
    //           type: 'dateRange',
    //           selectKey: 'dateRange',
    //           placeHolder: 'dateRange',
    //         },
    //       ]}
    //       container="platform"
    //     />
    //     <TopPerformingProperty
    //       moduleKey="MarketView/Platform/TopPerformingProperty"
    //       title="Top Performing Property Across All Platforms"
    //       filters={[
    //         {
    //           type: 'metric',
    //           selectKey: 'mwplttpaap-engagement',
    //           placeHolder: 'Engagement',
    //         },
    //         {
    //           type: 'property',
    //           selectKey: 'mwplttpaap-property',
    //           placeHolder: 'Property',
    //         },
    //       ]}
    //       container="platform"
    //     />
    //   </React.Fragment>
    // )

    return (
      <React.Fragment>
        <CVScoresComparison
          moduleKey="MarketView/Time/CVScoreComparison"
          title="CV Score By Videos Produced Comparison"
          filters={[
            {
              type: 'property',
              selectKey: 'MVPFCV-property',
              placeHolder: 'property',
            },
            {
              type: 'platform',
              selectKey: 'MVPFCV-platform',
              placeHolder: 'Platform',
            },
            {
              type: 'dateRange',
              selectKey: 'MVPFCV-date',
              placeHolder: 'Date',
            },
          ]}
          container="platform"
        />
      </React.Fragment>
    )
  }
}

Platform.propTypes = {}

export default Platform
