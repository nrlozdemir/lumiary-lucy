import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SingleItemSlider from 'Components/Sliders/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import Scrubber from 'Components/Sliders/Scrubber'
import XCircle from 'Components/Icons/XCircle'
import classnames from 'classnames'

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
      maxValue: 1000,
      sliderValue: 0,
      videoDuration: 185,
      sliderDisabled: false,
      sliderHandleStyle: {
        width: '92px',
        height: '16px',
        borderRadius: '10px',
        marginLeft: '0px',
        marginTop: '0px',
      },
      shots: this.props.shots || [],
    }
    this.refs = []
    this.shotSlider = React.createRef()
  }

  secondToTime(timeInSeconds) {
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

  timeToSeconds(timeString) {
    let splittedTimeString = timeString.split(':')
    let seconds = 0
    let minutes = 1

    while (splittedTimeString.length > 0) {
      seconds += minutes * parseInt(splittedTimeString.pop(), 10)
      minutes *= 60
    }

    return seconds
  }

  handleClick(i) {
    /*
    let totalWidthToShot = 0

    for(let index in this.state.scenes){
      if(index > i){
        break
      }
      totalWidthToShot += this.timeToSeconds(this.state.scenes[index].duration) * this.state.sliderShotSecondWidth
    }

    const findDifference = totalWidthToShot - this.state.sliderGrabberWidth
    */

    this.setState({
      selectedImage: i,
    })
  }

  onChangeSlider(e) {
    let sliderValue
    let leftMargin = 0 //calculate left margin if needed

    this.setState({
      sliderValue: 0,
      sliderLeftPosition: 0,
    })
    //
    return false

    e = parseInt(e)

    let scrollTo =
      (e - this.state.sliderHandleRightStep / 2) *
      this.state.sliderStepWidth *
      -1

    if (scrollTo > 0) {
      scrollTo = 0
    }
    if (
      scrollTo * -1 + this.state.sliderViewportSize >=
      this.state.sliderTotalWidth
    ) {
      scrollTo =
        (this.state.sliderTotalWidth - this.state.sliderViewportSize) * -1
    }

    this.setState({
      sliderValue: e,
      sliderLeftPosition: scrollTo,
    })

    if (e === 100) {
      leftMargin = Math.round(this.state.sliderGrabberWidth)

      this.setState({
        sliderValue: 100,
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: `-${leftMargin}px`,
        },
      })
    } else if (e + this.state.sliderHandleRightStep / 2 > 100) {
      sliderValue = Math.round(100 - this.state.sliderHandleRightStep / 2)
      leftMargin = Math.round(
        (this.state.sliderViewportSize -
          sliderValue * this.state.sliderViewportStepWidth) *
          2 -
          this.state.sliderGrabberWidth
      )

      if (leftMargin < 0) {
        leftMargin = this.state.sliderGrabberWidth / 2
      } else {
        leftMargin = this.state.sliderGrabberWidth / 2 + leftMargin
      }
      leftMargin = leftMargin.toFixed(0)

      this.setState({
        sliderValue: sliderValue,
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: `-${leftMargin}px`,
        },
      })
    } else if (e - Math.round(this.state.sliderHandleRightStep) / 2 < 1) {
      this.setState({
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: '0px',
        },
      })
    } else if (e === 0) {
      this.setState(
        {
          sliderHandleStyle: {
            ...this.state.sliderHandleStyle,
            marginLeft: '2px',
          },
          sliderDisabled: true,
        },
        () => {
          this.setState({
            sliderDisabled: false,
            sliderValue: 0,
          })
        }
      )
    } else if (e !== 100 && e !== 0) {
      this.setState({
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: parseInt((this.state.sliderGrabberWidth / 2) * -1) + 'px',
        },
      })
    }
  }

  componentDidMount() {
    const minShotWidth = 48
    const maxShotWidth = 156
    const viewportSize = 1120
    const tickCount = 11
    let sliderMarks = []
    let totalWidth = 5 // with first item left margin
    let viewportDurations = {}
    let viewportLeftOver = {}
    let viewportTempShots = {}
    let viewportTempShotsTotalWidth = {}
    let viewportShots = []

    const shots = Object.values(this.state.shots)
    const durations = shots.map(
      element => (element.endTime - element.startTime).toFixed(4)
    )
    const totalDuration = (shots[shots.length - 1].endTime).toFixed(4)
    
    //first index and last index not included
    const dividedDuration = (Math.round(totalDuration / (tickCount))).toFixed(4)
    
    //create marks
    for (let i = 0; i < tickCount - 1; i++) {
      sliderMarks.push(this.secondToTime(i * dividedDuration))
    }
    sliderMarks.push(this.secondToTime(shots[shots.length - 1].endTime))

    //rebuild custom-marks for styling
    let sliderMarksToState = {}
    sliderMarks.map((element, index) => {
      index = parseInt(index * 10)
      if (index === 0) {
        sliderMarksToState[index] = {
          style: { transform: 'translateX(0%)' },
          label: <p className="customDot">{element}</p>,
          value: element,
        }
      } else if (index === 100) {
        sliderMarksToState[index] = {
          style: { transform: 'translateX(-100%)' },
          label: <p className="customDot">{element}</p>,
          value: element,
        }
      } else {
        sliderMarksToState[index] = {
          style: { },
          label: <p className="customDot">{element}</p>,
          value: element,
        }
      }
    })

    this.setState({
      sliderMarks: sliderMarksToState
    })
    
    //create viewports including max 11 items from shots, fit size to min and max
    const totalViewports = (shots.length / tickCount).toFixed(2)
    for (let v = 0; v < totalViewports; v++) {
      viewportTempShots[v] = []
      viewportTempShotsTotalWidth[v] = 0
      viewportDurations[v] = 0
      viewportLeftOver[v] = 0
    }

    shots.map((el, i) => {
      const index = parseInt(Math.floor(i / 11))
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

      viewportTempShots[v].length === tickCount && 
        Object.values(viewportTempShots[v]).map((el, i) => {
        const findDiff = parseFloat(
          ((viewportLeftOver[v]  / 100) * (el.duration * 100 / viewportDurations[v])).toFixed(4)
        )
        if (viewportLeftOver[v] > 0) {
          if(el.width + findDiff > maxShotWidth){
            el.width = maxShotWidth;
            viewportLeftOver[v] -= maxShotWidth - el.width
          } else {
            el.width += findDiff
            viewportLeftOver[v] -= findDiff
          }
        } else if (viewportLeftOver[v] < 0) {
          if(el.width - findDiff < minShotWidth){
            el.width = minShotWidth;
            viewportLeftOver[v] += el.width - minShotWidth
          } else {
            el.width -= findDiff
            viewportLeftOver[v] += findDiff
          }
        }
      })

      if (viewportTempShots[v].length === tickCount) {
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

        viewportTempShots[v].length === tickCount && Object.values(viewportTempShots[v]).map((el, i) => {
          if (el.width > Math.floor(el.width) 
            && el.width - Math.floor(el.width) >= findTrimValue
            && viewportTempShotsTotalWidth[v] !== viewportSize
          ) {
            el.width -= findTrimValue
            viewportTempShotsTotalWidth[v] -= findTrimValue
          }
        })
      } else if (viewportTempShotsTotalWidth[v] < viewportSize) {
        const findTrimValue = parseFloat((viewportSize - viewportTempShotsTotalWidth[v]).toFixed(4))

        viewportTempShots[v].length === tickCount && Object.values(viewportTempShots[v]).map((el, i) => {
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

    console.log(viewportShots)  

    this.setState({
      viewportShots: viewportShots,
      viewportSize: viewportSize,
      viewportDurations: viewportDurations,
      sliderMarks: sliderMarksToState
    })
  }

  render() {
    const { sliderWithThumbnails, slideImages, radarData } = this.props
    const { selectedImage } = this.state
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <div
              ref={(shotSlider) => (this.shotSlider = shotSlider)}
              className="grid-container col-12 mt-72 mb-72"
              style={{
                backgroundColor: colors.moduleBackground,
                boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                color: colors.textColor,
                overflow: 'hidden',
              }}
            >
              {selectedImage ? (
                <div className={style.sliderTabContainer}>
                  <div
                    key={Math.random()}
                    className="col-6-no-gutters bg-black"
                  >
                    <div className="mt-48 ml-48 mr-48">
                      <SingleItemSlider
                        customHandleStyle={{
                          background: colors.shotByShotSliderPointer,
                        }}
                        slideImages={sliderWithThumbnails}
                        selectedImage={selectedImage}
                      />
                    </div>
                  </div>
                  <div className="col-6-no-gutters ">
                    <Tabs>
                      <div
                        style={{
                          background: colors.shotByShotTabHeader,
                          boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                        }}
                      >
                        <TabList className={style.tabList}>
                          <Tab selectedClassName={style.selectedTab}>
                            Demographics
                          </Tab>
                          <Tab selectedClassName={style.selectedTab}>
                            Objects
                          </Tab>
                          <Tab selectedClassName={style.selectedTab}>Color</Tab>
                          <div className={style.cancelButton}>
                            <XCircle
                              onClick={() =>
                                this.setState({ selectedImage: false })
                              }
                            />
                          </div>
                        </TabList>
                      </div>
                      <TabPanel className={style.tabPanelReset}>
                        <div className={classnames(style.tabPanel, 'mt-16')}>
                          <Scrubber vertical width={570} height={600}>
                            {slideImages.map((image, i) => (
                              <div
                                className={classnames(
                                  style.tabPanelItem,
                                  'grid-container',
                                  {
                                    'mb-16': i !== slideImages.length - 1,
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
                                    src={image.src}
                                    className="img-responsive"
                                  />
                                </div>
                                <div className="col-7-no-gutters">
                                  <div className="pt-20">
                                    {image.options.map((option, z) => (
                                      <div
                                        className={style.progressbarContainer}
                                        key={z}
                                      >
                                        <div className={style.barOptions}>
                                          <p>{option.text}</p>
                                          <p>{option.accurate}% Accurate</p>
                                        </div>
                                        <ProgressBar
                                          width={option.percentage}
                                          customBarClass={style.progressBar}
                                          customPercentageClass={
                                            style.percentage
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Scrubber>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className={style.tabPanel}>
                          <div
                            className={
                              style.tabPanelItem + ' grid-container mt-16'
                            }
                            style={{
                              background: colors.shotByShotBackground,
                              borderColor: colors.shotByShotBorder,
                            }}
                          >
                            <div className="col-5-no-gutters">
                              <img
                                src="https://picsum.photos/500/270?image=8"
                                className="img-responsive"
                              />
                            </div>
                            <div className="col-7-no-gutters">
                              <div className="pt-32">
                                <div className={style.progressbarContainer}>
                                  <div className={style.barOptions}>
                                    <p>Football Helmet</p>
                                    <p>78% Accurate</p>
                                  </div>
                                  <ProgressBar
                                    width={78}
                                    customBarClass={style.progressBar}
                                    customPercentageClass={style.percentage}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className={style.radarChartContainer}>
                          <RadarChart data={radarData} />
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="col-12" style={{ marginBottom: 40 }}>
                    <h2 className={style.sliderHeader}>Shot by Shot</h2>
                    <div className={style.sliderContainer}>
                      <div className={style.shotByShotMask} />
                      <Scrubber
                        horizontal
                        arrows
                        viewBordered
                        verticalDisabled
                        height={230}
                        width={1121}
                      >
                        <div
                          className={style.sliderWrapper}
                          style={{
                            left: 0,
                            width: 0,
                          }}
                        >
                          {this.state.shots.map((shot, i) => (
                            <React.Fragment key={i + 110}>
                              <div className={style.image}>
                                <div
                                  style={{
                                    width: `${shot.width}px`,
                                    borderColor: colors.shotByShotBackground,
                                  }}
                                  className={style.setCenter}
                                >
                                  <div
                                    className={style.originalImage}
                                    style={{
                                      width: `${shot.width}px`,
                                      height: '160px',
                                      backgroundImage: `url(${shot.image})`,
                                      backgroundSize: `160px 160px`,
                                      borderColor: colors.shotByShotBackground,
                                    }}
                                  />
                                </div>
                                <img
                                  src={shot.image}
                                  style={{ height: '160px' }}
                                  className={style.hover}
                                  onClick={() => {
                                    this.handleClick(i)
                                  }}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </Scrubber>
                    </div>
                    <div className={style.shotTicks}>
                      {this.state.sliderMarks &&
                        Object.keys(this.state.sliderMarks).map((m, i) => (
                          <p key={`slideMark-${i}`} className={style.shotTick}>
                            {this.state.sliderMarks[m].value}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LibraryDetailShotByShot
