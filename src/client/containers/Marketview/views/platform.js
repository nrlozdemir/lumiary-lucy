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
/* eslint-disable react/prefer-stateless-function */
export class Platform extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Slider
          title="Top Performing Videos By Platform"
          moduleKey="MarketView/Platform/Slider"
          infoText={`This module compares the videos within your library by the Content Vitality (CV) Score, showing the top scoring videos for each platform.`}
          filters={[
            {
              type: 'platformEngagement',
              selectKey: 'mwplttpaap-plateng',
              placeHolder: 'Engagement by Platform',
            },
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
          container="platform"
        />
        <TopVideosOverTime
          moduleKey="MarketView/Platform/TopVideosOverTime"
          title="Top Videos Over Time By Platform"
          infoText={`This module provides insights for the top performing industry videos against engagement metrics across time and property.  Using the drop-downs, you can adjust for the property, engagement metric, and time range to analyze.`}
          filters={[
            {
              type: 'property',
              selectKey: 'mwplttpaap-property',
              placeHolder: 'Property',
            },
            {
              type: 'metric',
              selectKey: 'mwplttpaap-engagement',
              placeHolder: 'Engagement',
            },
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
          container="platform"
          references={[
            {
              className: 'bg-cool-blue',
              text: 'Facebook',
            },
            {
              className: 'bg-lighter-purple',
              text: 'Instagram',
            },
            {
              className: 'bg-coral-pink',
              text: 'Twitter',
            },
            {
              className: 'bg-cool-grey',
              text: 'Youtube',
            },
          ]}
          container="platform"
        />
        <TopSimilarProperties
          moduleKey="MarketView/Platform/TopSimilarPropertiesModule"
          title="Similar Properties Of Top Videos"
          infoText={`This module offers insights on top 3 similar properties found within top performing industry videos. `}
          action={this.getSimilarProperties}
          presentWithDoughnut
          filters={[
            {
              type: 'dateRange',
              selectKey: 'dateRange',
              placeHolder: 'dateRange',
            },
          ]}
          container="platform"
        />
        <TopPerformingProperty
          moduleKey="MarketView/Platform/TopPerformingProperty"
          title="Top Performing Property Across All Platforms"
          filters={[
            {
              type: 'metric',
              selectKey: 'mwplttpaap-engagement',
              placeHolder: 'Engagement',
            },
            {
              type: 'property',
              selectKey: 'mwplttpaap-property',
              placeHolder: 'Property',
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
