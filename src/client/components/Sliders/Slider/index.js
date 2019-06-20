import React from 'react'
import classnames from 'classnames'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import style from './style.scss'
import { socialIconSelector } from 'Utils/'
import Swiper from 'react-id-swiper'
import SwiperJS from 'swiper/dist/js/swiper.js'
import RightArrowCircleFlat from 'Components/Icons/RightArrowCircleFlat'
import LeftArrowCircleFlat from 'Components/Icons/LeftArrowCircleFlat'

class MarketViewSlider extends React.Component {
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

  settings = {
    modules: [SwiperJS.Pagination],
    shouldSwiperUpdate: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullet',
      clickable: true,
    },
    slidesPerView: 'auto',
    spaceBetween: 40,
    centeredSlides: true,
    speed: 300,
    autoplay: false,
    keyboard: false,
    slideToClickedSlide: true,
    renderPagination: (props) => {
      const { items } = this.props

      return (
        <div className={classnames(style.pagination, 'pagination')}>
          {items.map((item, i) => {
            const socialIcon = classnames(
              socialIconSelector(item.socialMedia),
              style.icon
            )

            return (
              <div
                key={i}
                onClick={() => this.refSlider.slideTo(i)}
                className={i === 0 ? 'active' : ''}
              >
                <div className={style.videoContainer}>
                  <video src={item.image} />
                </div>
                <span>
                  <i className={socialIcon} />
                  {item.socialMedia}
                </span>
              </div>
            )
          })}
        </div>
      )
    },
    on: {
      slideChange: (index) => {
        const bullets = this.refSlider.$el[0].querySelector('.pagination')
          .children

        for (const item of [...bullets]) {
          item.classList.remove('active')
        }

        bullets[this.refSlider.activeIndex].classList.add('active')

        // Force rendering needed to update disabled state of prev and next buttons
        this.forceUpdate()
      },
    },
    renderNextButton: this.renderNextButton,
    renderPrevButton: this.renderPrevButton,
  }

  componentDidMount() {
    const findSlide =
      this.props.items && Math.floor(parseInt(this.props.items.length) / 2)
    this.props.items && this.refSlider && this.refSlider.slideTo(findSlide, 1)
  }

  render() {
    const { items } = this.props
    return (
      <div className={style.section}>
        <div className="marketViewSlider">
          <Swiper
            ref={(node) => node && (this.refSlider = node.swiper)}
            {...this.settings}
          >
            {items &&
              items.map((item, i) => (
                <div className="item" key={i}>
                  <AssetLayer
                    containerNoBorder
                    leftSocialIcon={item.socialMedia}
                    centerText={item.secondTitle}
                    title={`${item.title.substring(0, 20)}...`}
                    width={634}
                    height="100%"
                    rightValue={item.cvScore}
                  >
                    <video className={style.fullVideo} src={item.image} />
                    <div className={style.percentageWrapper}>
                      <PercentageBarGraph
                        key={Math.random()}
                        percentage={item.cvScore}
                        width={80}
                        height={20}
                        barWidth={2}
                        barSpaceWidth={1}
                        disableLabels
                        color="green"
                      />
                    </div>
                  </AssetLayer>
                </div>
              ))}
          </Swiper>
          <div className="swiper-pagination" />
        </div>
      </div>
    )
  }
}

export default MarketViewSlider
