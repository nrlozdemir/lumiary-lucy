import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import RightArrowCircleFlat from 'Components/Icons/RightArrowCircleFlat'
import LeftArrowCircleFlat from 'Components/Icons/LeftArrowCircleFlat'
import Swiper from 'react-id-swiper'
import SwiperJS from 'swiper/dist/js/swiper.js'
import { ThemeContext } from 'ThemeContext/themeContext'
import RouterLoading from 'Components/RouterLoading'
import VideoSliderCard from 'Components/VideoCard/VideoSliderCard'

class AudienceSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refThumb: null,
    }
    this.refSlider = React.createRef()
  }

  componentDidMount() {
    this.setState(
      {
        refThumb: this.refThumb,
      },
      () => {
        const findSlide =
          this.props.items && Math.floor(parseInt(this.props.items.length) / 2)
        this.props.items && this.refThumb && this.refThumb.slideTo(findSlide, 1)
      }
    )
  }

  renderNextButton = () => {
    return (
      <RightArrowCircleFlat
        className={classnames(
          style.nextButton,
          this.refSlider && this.refSlider.isEnd ? style.disabled : ''
        )}
        size={32}
        onClick={() => this.refSlider.slideNext()}
      />
    )
  }

  renderPrevButton = () => {
    return (
      <LeftArrowCircleFlat
        className={classnames(
          style.prevButton,
          this.refSlider && this.refSlider.isBeginning ? style.disabled : ''
        )}
        size={32}
        onClick={() => this.refSlider.slidePrev()}
      />
    )
  }

  render() {
    const { items, changeVideo, loading } = this.props
    const { refThumb } = this.state

    const settings = {
      modules: [SwiperJS.Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 'auto',
      spaceBetween: 40,
      centeredSlides: true,
      speed: 300,
      autoplay: false,
      keyboard: false,
      slideToClickedSlide: true,
      thumbs: {
        swiper: refThumb,
      },
      on: {
        slideChange: () => {
          if (this.refSlider) {
            refThumb.slideTo(this.refSlider.activeIndex, 300)
            changeVideo(items[this.refSlider.activeIndex])
          }
        },
      },
      renderNextButton: this.renderNextButton,
      renderPrevButton: this.renderPrevButton,
    }

    const thumbSettings = {
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      on: {
        slideChange: () => {
          if (this.refSlider) {
            this.refSlider.slideTo(this.refThumb.activeIndex, 300)
            changeVideo(items[this.refThumb.activeIndex])
          }
        },
      },
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.section}>
            <style>
              {`
                .swiper-slide p {
                  border: 1px solid ${colors.ageSliderBorder};
                  background-color: ${colors.bodyBackground};
                }
                .
                .swiper-slide p:after {
                  color: ${colors.textColor}
                }
                .swiper-slide-thumb-active p {
                  span {
                    color: ${colors.textColor}
                  }
                }
                .swiper-slide:before {
                  background-color: ${colors.selectBorder};
                  opacity: 1 !important;
                }
              `}
            </style>
            {refThumb && (
              <div className="audienceSlider">
                <Swiper
                  ref={(node) =>
                    node && this.refSlider && (this.refSlider = node.swiper)
                  }
                  {...settings}
                >
                  {items.map((item, i) => (
                    <div className="item" key={i}>
                      {item.loading ? (
                        !loading ? (
                          <RouterLoading key={i} />
                        ) : null
                      ) : (
                        <VideoSliderCard
                          isActive={refThumb.activeIndex === i}
                          item={item}
                          index={i}
                          title={
                            `${(item.title &&
                              `${item.title.substring(0, 32)} `) ||
                              ''}${item.secondTitle || ''}` || ''
                          }
                        />
                      )}
                    </div>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="audienceThumbSlider">
              <Swiper
                ref={(node) => node && (this.refThumb = node.swiper)}
                {...thumbSettings}
              >
                {items.map((item, i) => (
                  <div className="item" key={i}>
                    <p>
                      <span style={{ color: colors.textColor }}>
                        {item.age}
                      </span>
                    </p>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default AudienceSlider
