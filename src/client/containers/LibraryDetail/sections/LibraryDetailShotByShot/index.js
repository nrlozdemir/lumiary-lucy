import React from 'react'
import classnames from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, selectShotInfo, selectColorsInfo, selectPeopleData } from 'Reducers/libraryDetail'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SingleItemSlider from 'Components/Sliders/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import { ThemeContext } from 'ThemeContext/themeContext'
import Scrubber from 'Components/Sliders/Scrubber'
import XCircle from 'Components/Icons/XCircle'
import { mediaUrl } from 'Utils/globals'
import {capitalizeFirstLetter} from 'Utils'
import style from './style.scss'

const secondToTime = (timeInSeconds) => {
  let pad = (num, size) => {
      return ('000' + num).slice(size * -1)
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3)

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) // + ',' + pad(milliseconds, 3)
}

const timeToSeconds = (timeString) => {
  let splittedTimeString = timeString.split(':')
  let seconds = 0
  let minutes = 1

  while (splittedTimeString.length > 0) {
    seconds += minutes * parseInt(splittedTimeString.pop(), 10)
    minutes *= 60
  }

  return seconds
}

const SliderWithScrubber = (props) => {
  const { 
    markers, 
    shots, 
    shotMargin, 
    minShotWidth, 
    maxShotWidth, 
    ticks, 
    viewportWidth, 
    viewportHeight, 
    shotHeight, 
    shotHoverWidth, 
    shotHoverHeight,
    customClass,
    customStyle,
    scrubberIsDot,
    scrubberWidth,
    scrubberHeight,
  } = props

  if (shots && shots.length > 0) {
    let tempMarks = []
    let marks = {}
    let shotsTotalWidth = 0
    let viewportDurations = {}
    let viewportLeftOver = {}
    let viewportTempShots = {}
    let viewportTempShotsTotalWidth = {}
    let viewportShots = []
    const viewportSize = viewportWidth - ((ticks + 1) * shotMargin)
    
    /*
    const durations = shots.map(
      element => (element.endTime - element.startTime).toFixed(4)
    )
    */
    const totalDuration = (shots[shots.length - 1].endTime).toFixed(4)
    
    //first index and last index not included
    const dividedDuration = (Math.round(totalDuration / (ticks))).toFixed(4)
    
    if(markers) {
      //create marks
      for (let i = 0; i < ticks - 1; i++) {
        tempMarks.push(secondToTime(i * dividedDuration))
      }
      tempMarks.push(secondToTime(shots[shots.length - 1].endTime))
  
      //rebuild custom-marks for styling
      tempMarks.map((element, index) => {
        index = parseInt(index * 10)
        if (index === 0) {
          marks[index] = {
            style: {
              transform: 'translateX(0%)'
            },
            label: <p className = "customDot" > {
              element
            } </p>,
            value: element,
          }
        } else if (index === 100) {
          marks[index] = {
            style: {
              transform: 'translateX(-100%)'
            },
            label: <p className = "customDot" > {
              element
            } </p>,
            value: element,
          }
        } else {
          marks[index] = {
            style: {},
            label: <p className = "customDot" > {
              element
            } </p>,
            value: element,
          }
        }
      })
    }
    
    //create viewports including max 11 items from shots, fit size to min and max
    const totalViewports = (shots.length / ticks).toFixed(2)
    for (let v = 0; v < totalViewports; v++) {
      viewportTempShots[v] = []
      viewportTempShotsTotalWidth[v] = 0
      viewportDurations[v] = 0
      viewportLeftOver[v] = 0
    }
    
    shots.map((el, i) => {
      const index = parseInt(Math.floor(i / ticks))
      el.duration = parseFloat(
        (el.endTime - el.startTime).toFixed(4)
      )
      viewportTempShots[index].push(el)
      viewportDurations[index] += el.duration
    })
    
    for (let v = 0; v < totalViewports; v++) {
      Object.values(viewportTempShots[v]).map((el, i) => {
        el.realWidth = parseFloat(
          ((viewportSize / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
        )
        el.width = parseFloat(
          ((viewportSize / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
        )
        el.max = 0
        el.diff = maxShotWidth - el.width
        if (el.width < minShotWidth) {
          viewportLeftOver[v] -= minShotWidth - el.width
          el.width = minShotWidth
          el.diff = maxShotWidth - minShotWidth
        }
        if (el.width > maxShotWidth) {
          viewportLeftOver[v] += el.width - maxShotWidth
          el.width = maxShotWidth
          el.diff = 0
          el.max = 1
        }
      })
    
      viewportTempShots[v].length === ticks &&
        Object.values(viewportTempShots[v]).map((el, i) => {
          const findDiff = parseFloat(
            ((viewportLeftOver[v] / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
          )
          if (viewportLeftOver[v] > 0) {
            if (el.width + findDiff > maxShotWidth) {
              el.width = maxShotWidth;
              viewportLeftOver[v] -= maxShotWidth - el.width
            } else {
              el.width += findDiff
              viewportLeftOver[v] -= findDiff
            }
          } else if (viewportLeftOver[v] < 0) {
            if (el.width - findDiff < minShotWidth) {
              el.width = minShotWidth;
              viewportLeftOver[v] += el.width - minShotWidth
            } else {
              el.width -= findDiff
              viewportLeftOver[v] += findDiff
            }
          }
        })
    
      if (viewportTempShots[v].length === ticks) {
        do {
          Object.values(viewportTempShots[v]).map((el, i) => {
            if (viewportLeftOver[v] > 0) {
              if (el.max !== 1 && el.diff > 0 && el.width !== maxShotWidth) {
                el.width += 1
                viewportLeftOver[v] -= 1
              }
            }
          })
        } while (viewportLeftOver[v] > 0)
      }
    
      viewportTempShotsTotalWidth[v] = Object.values(viewportTempShots[v]).reduce(
        (prev, next) => prev + parseFloat(next.width.toFixed(4)), 0
      )
    
      if (viewportTempShotsTotalWidth[v] > viewportSize) {
        const findTrimValue = parseFloat((viewportTempShotsTotalWidth[v] - viewportSize).toFixed(4))
    
        viewportTempShots[v].length === ticks && Object.values(viewportTempShots[v]).map((el, i) => {
          if (el.width > Math.floor(el.width) &&
            el.width - Math.floor(el.width) >= findTrimValue &&
            viewportTempShotsTotalWidth[v] !== viewportSize
          ) {
            el.width -= findTrimValue
            viewportTempShotsTotalWidth[v] -= findTrimValue
          }
        })
      } else if (viewportTempShotsTotalWidth[v] < viewportSize) {
        const findTrimValue = parseFloat((viewportSize - viewportTempShotsTotalWidth[v]).toFixed(4))
    
        viewportTempShots[v].length === ticks && Object.values(viewportTempShots[v]).map((el, i) => {
          if (viewportTempShotsTotalWidth[v] !== viewportSize) {
            el.width += findTrimValue
            viewportTempShotsTotalWidth[v] += findTrimValue
          }
        })
      }
    
      Object.values(viewportTempShots[v]).map((el, i) => {
        viewportShots.push(el)
      })
    }
    
    viewportShots && viewportShots.map((el, i) => {
      shotsTotalWidth += el.width + shotMargin
    })
  
    return (
      <Scrubber
        horizontal
        arrows
        viewBordered
        verticalDisabled
        height={viewportHeight}
        width={viewportWidth + 1}
        marks={marks}
        totalWidth={shotsTotalWidth}
        scrubberWidth={scrubberWidth}
        scrubberHeight={scrubberHeight}
        scrubberIsDot={scrubberIsDot}
      >
        <div className={customClass.sliderWrapper}
          style={{
            left: 0,
            width: shotsTotalWidth,
          }}
        >
        {viewportShots.map((shot, i) => (
          <React.Fragment key={i}>
            <div className={customClass.image}>
              <div
                style={{
                  width: `${shot.width.toFixed(2)}px`,
                  borderColor: customStyle.imageWrapperBorderColor,
                }}
                className={customClass.imageWrapper}
              >
                <div
                  className={customClass.originalImage}
                  style={{
                    width: `${shot.width.toFixed(2)}px`,
                    height: `${shotHeight}px`,
                    backgroundImage: `url(${shot.image})`,
                    backgroundSize: `${shotHoverWidth}px ${shotHoverHeight}px`,
                    borderColor: customStyle.originalImageBorderColor,
                  }}
                />
              </div>
              <img
                src={shot.image}
                style={{ 
                  height: `${shotHeight}px`,
                }}
                className={customClass.imageHover}
                onClick={() => { !!props.clickEvent && props.clickEvent(i) }}
              />
            </div>
          </React.Fragment>
        ))}
        </div>
      </Scrubber>
    )
  }
}

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
      sliderValue: null,
    }
    
    this.shotClick = this.shotClick.bind(this)
  }

  onChangeSlider(e) {
    this.setState({
      sliderValue: 0,
      sliderLeftPosition: 0,
    })
  }

  shotClick(i) { 
    this.setState({
      selectedImage: i,
    })

    this.props.getShotInfoRequest(i)
    this.props.getRadarChartRequest(i)
    this.props.getPeopleRequest(i)

    //const { height } = this.slider.getBoundingClientRect()
  }

  render() {
    const { shotInfo, radarChartData, peopleData } = this.props
    const { selectedImage } = this.state
    const radarChartDataConfigured = radarChartData &&{
      labels: [
        "#cc2226",
        "#dd501d",
        "#eb7919",
        "#f8b90b",
        "#aac923",
        "#fff20d",
        "13862b",
        "#229a78",
        "#79609b",
        "#923683",
        "#b83057",
        //"#3178b0",
      ],
      datasets: [
        {
          label: "Shots",
          backgroundColor: "rgb(82, 146, 229, 0.5)",
          borderColor: "rgb(82, 146, 229, 1)",
          pointBackgroundColor: "rgb(82, 146, 229, 0.5)",
          pointBorderColor: "rgb(82, 146, 229, 1)",
          data: radarChartData
        }
      ]
    }

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <div
              className="grid-container col-12 mt-72 mb-72"
              ref={(el) => (this.slider = el)}
              style={{
                backgroundColor: colors.moduleBackground,
                boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                color: colors.textColor,
                overflow: 'hidden',
              }}
            >
              {selectedImage !== null ? (
              <div className={style.sliderTabContainer}>
                <div
                  key={Math.random()}
                  className="col-6-no-gutters bg-black"
                >
                  <div className="mt-48 ml-48 mr-48">
                    {shotInfo && (
                      <SingleItemSlider
                        customHandleStyle={{
                          background: colors.shotByShotSliderPointer,
                        }}
                        slideImages={shotInfo.shot.frames}
                        selectedImage={selectedImage}
                      />
                    )}
                  </div>
                </div>
                <div className="col-6-no-gutters">
                  <Tabs>
                    <div
                      style={{
                        background: colors.shotByShotTabHeader,
                        boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                      }}
                    >
                      <TabList className={style.tabList}>
                        <Tab selectedClassName={style.selectedTab}>
                          People
                        </Tab>
                        <Tab selectedClassName={style.selectedTab}>
                          Objects
                        </Tab>
                        <Tab selectedClassName={style.selectedTab}>Color</Tab>
                        <div className={style.cancelButton}>
                          <XCircle
                            onClick={() =>
                              this.setState({ selectedImage: null })
                            }
                          />
                        </div>
                      </TabList>
                    </div>
                    <TabPanel className={style.tabPanelReset}>
                      <div className={classnames(style.tabPanel, 'mt-16')}>
                        <Scrubber
                          vertical
                          width={570}
                          height={368}
                        >
                          {peopleData && Object.values(peopleData).map((info, i) => (
                            <div
                              className={classnames(
                                style.tabPanelItem,
                                'grid-container'
                              )}
                              style={{
                                background: colors.shotByShotBackground,
                                borderColor: colors.shotByShotBorder,
                                marginRight: '16px !important',
                              }}
                              key={i}
                            >
                              <div className="col-5-no-gutters">
                                <img
                                  src={`${mediaUrl}/lumiere/6421cdac-d5eb-4427-a267-b9be2e232177/e2843ddb-4ba1-4062-acd9-2ffbe302a183/0/`}
                                  className={classnames(
                                    style.imageItem,
                                    'grid-container'
                                  )}
                                />
                              </div>
                              <div className="col-7-no-gutters">
                                <div className="pt-20">
                                  <div
                                    className={style.progressbarContainer}
                                    key={i}
                                  >
                                    <div className={style.barOptions}>
                                      <p>{capitalizeFirstLetter(info.gender)}</p>
                                      <p>
                                        {(info.ages.confidence * 100).toFixed(0)}
                                        % Accurate
                                      </p>
                                    </div>
                                    <ProgressBar
                                      width={(info.ages.confidence * 100).toFixed(0)}
                                      customBarClass={style.progressBar}
                                      customPercentageClass={
                                        style.percentage
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="pt-20">
                                  <div
                                    className={style.progressbarContainer}
                                    key={i}
                                  >
                                    <div className={style.barOptions}>
                                      <p>{info.ages.min} Y/O</p>
                                      <p>
                                        {(info.ages.min).toFixed(0)}
                                        % Accurate
                                      </p>
                                    </div>
                                    <ProgressBar
                                      width={(info.ages.confidence * 100).toFixed(0)}
                                      customBarClass={style.progressBar}
                                      customPercentageClass={
                                        style.percentage
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Scrubber>
                      </div>
                    </TabPanel>
                    <TabPanel className={style.tabPanelReset}>
                      <div className={classnames(style.tabPanel, 'mt-16')}>
                        <Scrubber
                          vertical
                          width={570}
                          height={368}
                        >
                          {shotInfo &&
                            shotInfo.shot &&
                            shotInfo.shot.labels &&
                            shotInfo.shot.labels.map((info, i) => (
                            <div
                              className={classnames(
                                style.tabPanelItem,
                                'grid-container',
                                {
                                  'mb-16':
                                    i !== shotInfo.shot.labels.length - 1,
                                }
                              )}
                              style={{
                                background: colors.shotByShotBackground,
                                borderColor: colors.shotByShotBorder,
                                marginRight: '16px !important',
                              }}
                              key={i}
                            >
                              <div className="col-5-no-gutters">
                                <img
                                  src={`${mediaUrl}/lumiere/6421cdac-d5eb-4427-a267-b9be2e232177/e2843ddb-4ba1-4062-acd9-2ffbe302a183/0/${
                                    shotInfo.shot.frames[i]
                                  }`}
                                  className={classnames(
                                    style.imageItem,
                                    'grid-container'
                                  )}
                                />
                              </div>
                              <div className="col-7-no-gutters">
                                <div className="pt-20">
                                  <div
                                    className={style.progressbarContainer}
                                    key={i}
                                  >
                                    <div className={style.barOptions}>
                                      <p>{info.label}</p>
                                      <p>
                                        {(info.confidence * 100).toFixed(0)}
                                        % Accurate
                                      </p>
                                    </div>
                                    <ProgressBar
                                      width={(
                                        info.confidence * 100
                                      ).toFixed(0)}
                                      customBarClass={style.progressBar}
                                      customPercentageClass={
                                        style.percentage
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Scrubber>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className={style.radarChartContainer}>
                        {radarChartDataConfigured && (
                          <RadarChart data={radarChartDataConfigured} />
                        )}
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
              ) : (
                <React.Fragment>
                  <h2 className={style.sliderHeader}>Shot by Shot</h2>
                  <div className={style.sliderContainer}>
                    <div className={style.shotByShotMask} />
                    <SliderWithScrubber
                      clickEvent={ this.shotClick }
                      shots={Object.values(this.props.shots)} 
                      shotMargin={5}
                      minShotWidth={24}
                      maxShotWidth={148}
                      shotHeight={160}
                      shotHoverWidth={160}
                      shotHoverHeight={160}
                      viewportWidth={1118}
                      viewportHeight={230}
                      ticks={11}
                      markers 
                      customClass={{
                        sliderWrapper: style.sliderWrapper,
                        imageWrapper: style.setCenter,
                        image: style.image,
                        imageHover: style.hover,
                        originalImage: style.originalImage,
                      }}
                      customStyle={{
                        originalImageBorderColor: colors.shotByShotBackground,
                        imageWrapperBorderColor: colors.shotByShotBackground
                      }}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  shotInfoData: selectShotInfo(),
  radarChartData: selectColorsInfo(),
  peopleData: selectPeopleData(),
})

function mapDispatchToProps(dispatch) {
  return {
    getShotInfoRequest: (shotId) => dispatch(actions.getShotInfoRequest(shotId)),
    getRadarChartRequest: (shotId) => dispatch(actions.getRadarChartRequest(shotId)),
    getPeopleRequest: (shotId) => dispatch(actions.getPeopleRequest(shotId)), 
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryDetailShotByShot)
