import React from 'react'
import ProgressBar from 'Components/ProgressBar'
import GeneratedReportViewSlider from 'Components/Sliders/ReportGenerated'

import style from './style.scss'

const Slider = ({ data, changeSelectedVideo, selectedVideo }) => {
  return (
    <div className="bg-dark-grey-blue mt-32">
      <div className={style.cardHeader}>
        <p>Top Performing Videos</p>
      </div>
      <GeneratedReportViewSlider
        items={data}
        changeVideo={(video) => changeSelectedVideo(video)}
      />
      <div className={style.cardContainer}>
        {selectedVideo.options.map((card, index) => (
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
