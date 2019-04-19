import React from 'react'
import cx from 'classnames'
import style from './style.scss'
import ComparisonHorizontalBarChart from 'Components/ComparisonHorizontalBarChart'
import Module from 'Components/Module'

class VideoComparison extends React.Component {
  render() {
    const comparisonContainer = cx(
      'shadow-1 grid-container col-12',
      style.videoComparisonContainer
    )
    return (
      <div className={comparisonContainer}>
        <ComparisonHorizontalBarChart />
      </div>
    )
  }
}

export default VideoComparison
