import React, { Component } from 'react'
import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'
import PerformanceComparison from '../section/PerformanceComparison'
import ColorComparison from '../section/ColorComparison'

class CompareBrand extends Component {
  render() {
    return (
      <div>
        <ContentVitalityScore />
        <VideoComparison />
        <PerformanceComparison />
        <ColorComparison />
      </div>
    )
  }
}

export default CompareBrand
