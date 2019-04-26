import React from 'react'
import classnames from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import MarketViewSlider from 'Components/Sliders/Marketview'
import SelectFilters from 'Components/SelectFilters'

import style from 'Containers/Marketview/style.scss'
import { Module } from '../../../../../components/Module'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectPlatforms: '',
      selectLikes: '',
      selectDate: '',
    }
  }

  render() {
    const { data, selectedVideo, changeSelectedVideo } = this.props

    return (
      <Module customModuleContainer={style.sliderModuleContainer}>
        <div className="col-12-no-gutter">
          <MarketViewSlider items={data} changeVideo={changeSelectedVideo} />
        </div>
        <div className="col-12-no-gutter">
          {selectedVideo &&
            selectedVideo.options.map((card, index) => (
              <div className={style.card} key={index}>
                <p className={style.marketCardHeader}>{card.name}</p>
                {card.compareValues.map((value, i) => (
                  <div className={style.progressArea} key={i}>
                    <p className={style.title}>{value.title}</p>
                    <p className={style.progressText}>
                      <span className={style.leftTitle}>{value.leftTitle}</span>
                      <span className={style.rightTitle}>
                        {value.rightTitle}
                      </span>
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
      </Module>
    )
  }
}
