import React from 'react'
import classnames from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import MarketViewSlider from 'Components/Sliders/Marketview'

import style from 'Containers/Marketview/style.scss'

const Slider = ({ data, changeSelectedVideo, className }) => {
  const containerClasses = classnames('bg-dark-grey-blue', className)

  return (
    <div className={containerClasses}>
      <MarketViewSlider
        items={data.videos}
        changeVideo={(video) => changeSelectedVideo(video)}
      />
      <div className={style.cardContainer}>
        {data.selectedVideo.options.map((card, index) => (
          <div className={style.card} key={index}>
            <p className={style.marketCardHeader}>{card.name}</p>
            {card.compareValues.map((value, i) => (
              <div className={style.progressArea} key={i}>
                <p className={style.title}>{value.title}</p>
                <p className={style.progressText}>
                  <span className={style.leftTitle}>{value.leftTitle}</span>
                  <span className={style.rightTitle}>{value.rightTitle}</span>
                </p>
                <ProgressBar
                  width={value.value}
                  customBarClass={style.progressBar}
                  customPercentageClass={
                    i % 2 ? style.percentageRed : style.percentageBlue
                  }
                />
              </div>
            ))}
            <p className={style.cardDescription}>{card.description} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
