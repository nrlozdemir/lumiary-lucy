import React from 'react'
import PropTypes from 'prop-types'

import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import style from './style.scss'
import { floatCvScore } from 'Utils'

class VideoSliderCard extends React.Component {
  handleMouseOverPlay = () => {
    this.props.isActive && !!this.videoRef && this.videoRef.play()
  }

  handleMouseOutPlay = () => {
    if (this.props.isActive && !!this.videoRef) {
      this.videoRef.pause()
      this.videoRef.currentTime = 0
    }
  }

  render() {
    const { item, index, isActive, title } = this.props
    return (
      <div
        onMouseEnter={() => this.handleMouseOverPlay()}
        onMouseLeave={() => this.handleMouseOutPlay()}
      >
        <AssetLayer
          isActive={isActive}containerNoBorder
          leftSocialIcon={item.socialMedia}
          centerText={item.secondTitle}
          title={title}
          width={634}
          height='100%'
          rightValue={floatCvScore(item.cvScore) || 0.0}
        >
          {!!item.video || !!item.image ? (
            <video
              key={`video-${item.video || item.image}${index}`}
              className={style.fullVideo}
              src={item.video || item.image}
              ref={(videoRef) => (this.videoRef = videoRef)}
              loop
              muted
              controls={false}
            />
          ) : (
            <div className={style.videoEmpty}>No Data Available</div>
          )}
          <div className={style.percentageWrapper}>
            <PercentageBarGraph
              percentage={item.cvScore}
              width={80}
              height={20}
              barWidth={1.5}
              barSpaceWidth={1.5}
              disableLabels
              color="green"
            />
          </div>
        </AssetLayer>
      </div>
    )
  }
}

VideoSliderCard.defaultProps = {
  isActive: false,
  title: '',
}

VideoSliderCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  title: PropTypes.string,
}

export default VideoSliderCard
