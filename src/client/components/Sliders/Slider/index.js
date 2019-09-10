import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { makeSelectAuthProfile } from 'Reducers/auth'

import classnames from 'classnames'
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import style from './style.scss'
import { socialIconSelector } from 'Utils'
import Slider from 'react-slick'
import RightArrowCircleFlat from 'Components/Icons/RightArrowCircleFlat'
import LeftArrowCircleFlat from 'Components/Icons/LeftArrowCircleFlat'
import VideoSliderCard from 'Components/VideoCard/VideoSliderCard'

function RenderNextButton({ onClick }) {
  return (
    <RightArrowCircleFlat
      className={style.nextButton}
      size={32}
      onClick={onClick}
    />
  )
}

function RenderPrevButton({ onClick }) {
  return (
    <LeftArrowCircleFlat
      className={style.prevButton}
      size={32}
      onClick={onClick}
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
    const { items, profile } = this.props

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
      nextArrow: <RenderNextButton />,
      prevArrow: <RenderPrevButton />,
      // beforeChange: (oldIndex, newIndex) =>
      //   this.setState({ currentIdx: newIndex }),
      afterChange: (current) => this.setState({ currentIdx: current }),
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
