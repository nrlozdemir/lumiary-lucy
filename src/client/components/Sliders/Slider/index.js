import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { makeSelectAuthProfile } from 'Reducers/auth'

import cx from 'classnames'
import style from './style.scss'
import { socialIconSelector } from 'Utils'
import Slider from 'react-slick'
import ArrowCircle from 'Components/Icons/ArrowCircle'
import VideoSliderCard from 'Components/VideoCard/VideoSliderCard'

function RenderButton({ onClick, direction }) {
  return (
    <ArrowCircle
      className={style.nextButton}
      size={32}
      onClick={onClick}
      direction={direction}
      flatIcon={true}
    />
  )
}

class MarketViewSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIdx: null,
    }
  }

  componentDidMount() {
    const findSlide =
      this.props.items && Math.floor(parseInt(this.props.items.length) / 2)
    this.setState({
      currentIdx: findSlide,
    })
    this.props.items && this.refSlider && this.refSlider.slickGoTo(findSlide, 1)
  }

  getBrandName = (competitors, item, limit) => {
    const parsedUrl = item.image.split('/')

    const brand = parsedUrl.reduce((result, maybeUuid) => {
      const foundBrand = competitors.find((c) => c.uuid === maybeUuid)
      return !!foundBrand ? foundBrand : result
    }, null)

    const title = brand ? brand.name : item.title
    return title.length >= limit ? `${title.substring(0, limit)}...` : title
  }

  render() {
    const { currentIdx, createRef } = this.state
    const { items, profile, changeVideo } = this.props

    const competitors =
      !!profile && !!profile.brand
        ? [
            { uuid: profile.brand.uuid, name: profile.brand.name },
            ...profile.brand.competitors,
          ]
        : []

    const _getBrandName = this.getBrandName
    const settings = {
      customPaging: function(i) {
        const title = _getBrandName(competitors, items[i], 8)

        return (
          <a>
            <div className={i === 0 ? 'active' : ''}>
              <div className={style.videoContainer}>
                <video src={items[i].image} />
              </div>
              <span>
                <i className={socialIconSelector(items[i].socialMedia)} />
                {title}
              </span>
            </div>
          </a>
        )
      },
      dots: true,
      dotsClass: style.pagination,
      className: 'center',
      centerMode: true,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      variableWidth: true,
      draggable: false,
      speed: 200,
      nextArrow: <RenderButton direction="right" />,
      prevArrow: <RenderButton direction="left" />,
      // beforeChange: (oldIndex, newIndex) =>
      //   this.setState({ currentIdx: newIndex }),
      afterChange: (current) => {
        this.setState({ currentIdx: current }, () =>
          changeVideo(items[this.state.currentIdx])
        )
      },
    }

    return (
      <div className={style.section}>
        <style>
          {`
            .${style.pagination} > li.slick-active {
              opacity: 1 !important;
              font-family: "ClanOTBold";
              font-weight: bold;
            }
          `}
        </style>
        <div className="marketViewSlickSlider">
          <Slider ref={(node) => node && (this.refSlider = node)} {...settings}>
            {items &&
              items.map((item, i) => {
                const title = this.getBrandName(competitors, item, 20)

                return (
                  <VideoSliderCard
                    containerClass={cx('item', { width: 634 })}
                    item={item}
                    key={i}
                    index={i}
                    isActive={currentIdx === i}
                    title={title}
                  />
                )
              })}
          </Slider>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  profile: makeSelectAuthProfile(),
})

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(MarketViewSlider)
