import React from 'react'
import classnames from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import MarketViewSlider from 'Components/Sliders/Marketview'
import SelectFilters from 'Components/SelectFilters'

import style from 'Containers/Marketview/style.scss'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectPlatforms: '',
      selectLikes: '',
      selectDate: '',
    }
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectLikes, selectPlatforms, selectDate } = this.state
    const {
      data,
      changeSelectedVideo,
      className,
      title = 'Top Performing Videos By Platform',
    } = this.props
    const containerClasses = classnames('bg-dark-grey-blue', className)
    const titleClasses = classnames(style.cardTitle, 'col-12', 'pt-32')

    return (
      <div className={containerClasses}>
        <div className={titleClasses} style={{ marginBottom: 0 }}>
          <span>{title}</span>
          <div className={style.selects}>
            <SelectFilters
              handleSelectFilters={this.handleSelectFilters}
              selectPlatformsShow={true}
              selectPlatforms={selectPlatforms}
              selectLikesShow={true}
              selectLikes={selectLikes}
              selectDateShow={true}
              selectDate={selectDate}
            />
          </div>
        </div>
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
}
