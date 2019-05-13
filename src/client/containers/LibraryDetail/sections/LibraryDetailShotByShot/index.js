import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Slider from 'rc-slider'
import SingleItemSlider from 'Components/Sliders/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

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
      scenes: this.props.sliderWithThumbnails || [],
    }
    this.slide = React.createRef()
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
    const minShotWidth = 24
    const maxShotWidth = 148
    const viewportSize = 1120
    const tickCount = 11
    let totalWidth = 5 // with first item left margin
    let sliderMarks = []

    const durations = this.state.scenes.map((element) =>
      this.timeToSeconds(element.duration)
    )
    const totalDuration = this.state.scenes.reduce(
      (prev, next) => prev + this.timeToSeconds(next.duration),
      0
    )
    const dividedDuration = Math.round(totalDuration / (tickCount - 1))

    sliderMarks.push(this.secondToTime(0))
    for (let i = 1; i < tickCount - 1; i++) {
      sliderMarks.push(this.secondToTime(dividedDuration * i))
    }
    sliderMarks.push(this.secondToTime(totalDuration))

    const minShotDuration = Math.min(...durations)
    const maxShotDuration = Math.max(...durations)
    const shotDurationDifference = Math.ceil(maxShotDuration - minShotDuration)
    const shotDurationWidthDifference = Math.ceil(maxShotWidth - minShotWidth)
    const anySecondWidth = (
      shotDurationWidthDifference / shotDurationDifference
    ).toFixed(2)

    let tempState = {}
    let shotWidth = 0

    this.state.scenes.map((element, index) => {
      tempState = this.state
      shotWidth = Math.floor(
        (this.timeToSeconds(tempState.scenes[index].duration) -
          minShotDuration) *
          anySecondWidth +
          minShotWidth
      )
      tempState.scenes[index].width = shotWidth
      totalWidth += shotWidth + 5 // add all right margins
      tempState.sliderTotalWidth = totalWidth

      this.setState(tempState)
    })

    //rcSliderWidth = parseInt(document.getElementsByClassName('rc-slider')[0].clientWidth) //calculate viewport for resposive
    const sliderViewportStepWidth = viewportSize / 100
    const sliderStepWidth = totalWidth / 100
    let rcGrabberWidth = viewportSize / (totalWidth / viewportSize)
    if (rcGrabberWidth > viewportSize) {
      rcGrabberWidth = viewportSize
    }
    const sliderHandleRightStep =
      100 -
      ((viewportSize - rcGrabberWidth) / sliderViewportStepWidth).toFixed(2)

    //rebuild custom-marks
    let sliderMarksToState = {}
    sliderMarks.map((element, index) => {
      index = parseInt(index * 10)
      if (index === 0) {
        sliderMarksToState[index] = {
          style: { transform: 'translateX(0%)' },
          label: <p className="customDot">{element}</p>,
        }
      } else if (index === 100) {
        sliderMarksToState[index] = {
          style: { transform: 'translateX(-100%)' },
          label: <p className="customDot">{element}</p>,
        }
      } else {
        sliderMarksToState[index] = {
          label: <p className="customDot">{element}</p>,
        }
      }
    })

    this.setState({
      sliderViewportSize: viewportSize,
      sliderShotSecondWidth: anySecondWidth,
      sliderHandleRightStep: sliderHandleRightStep,
      sliderTotalWidth: totalWidth,
      sliderWidth: viewportSize,
      sliderMarks: sliderMarksToState,
      sliderLeftPosition: '0px',
      sliderGrabberWidth: rcGrabberWidth,
      sliderViewportStepWidth: sliderViewportStepWidth,
      sliderStepWidth: sliderStepWidth,
      sliderHandleStyle: {
        ...this.state.sliderHandleStyle,
        width: rcGrabberWidth - 3 + 'px',
        marginLeft: '0px',
      },
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
              className="grid-container col-12 mt-48 mb-48"
              style={{
                backgroundColor: colors.moduleBackground,
                boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                color: colors.textColor,
              }}
            >
              {selectedImage ? (
                <div className={style.sliderTabContainer}>
                  <div className="col-6-no-gutters bg-black">
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
                            <span
                              className="icon-X-Circle"
                              onClick={() =>
                                this.setState({ selectedImage: false })
                              }
                            >
                              <span className="path1" />
                              <span className="path2" />
                              <span className="path3" />
                            </span>
                          </div>
                        </TabList>
                      </div>
                      <TabPanel>
                        <div className={style.tabPanel}>
                          {slideImages.map((image, i) => (
                            <div
                              className={
                                style.tabPanelItem + ' grid-container mt-16'
                              }
                              style={{
                                background: colors.shotByShotBackground,
                                borderColor: colors.shotByShotBorder,
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
                                        customPercentageClass={style.percentage}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
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
                  <div className="col-12">
                    <h2 className={style.sliderHeader}>Shot by Shot</h2>
                    <div
                      className={style.sliderContainer}
                      ref={this.slide}
                      style={{
                        border: `1px solid ${colors.shotByShotBorder}`,
                      }}
                    >
                      <div
                        className={style.sliderWrapper}
                        style={{
                          left: this.state.sliderLeftPosition,
                          width: this.state.sliderTotalWidth,
                        }}
                      >
                        {this.state.scenes.map((scene, i) => (
                          <div className={style.image} key={i}>
                            <div
                              style={{
                                width: `${scene.width}px`,
                                borderColor: colors.shotByShotBackground,
                              }}
                              className={style.setCenter}
                            >
                              <div
                                className={style.originalImage}
                                style={{
                                  width: `${scene.width}px`,
                                  backgroundImage: `url(${scene.sceneURL})`,
                                  borderColor: colors.shotByShotBackground,
                                }}
                              />
                            </div>
                            <img
                              src={scene.sceneURL}
                              className={style.hover}
                              onClick={() => {
                                this.handleClick(i)
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-16 mb-16 library-detail-slider">
                    <div className="library-shotbyshot">
                      <Slider
                        step={1}
                        defaultValue={0}
                        value={this.state.sliderValue}
                        onChange={(val) => this.onChangeSlider(val)}
                        handleStyle={{
                          ...this.state.sliderHandleStyle,
                          borderColor: colors.shotByShotBorder,
                        }}
                        trackStyle={{
                          height: '16px',
                          backgroundColor: 'transparent',
                          borderColor: colors.shotByShotBorder,
                        }}
                        min={0}
                        max={100}
                        railStyle={{
                          height: '16px',
                          borderRadius: '10px',
                          backgroundColor: colors.shotByShotBackground,
                          borderColor: colors.shotByShotBorder,
                          boxShadow: `0 2px 6px 0 ${
                            colors.shotByShotBackground
                          }`,
                        }}
                        dotStyle={{
                          width: '0px',
                          height: '16px',
                          border: 0,
                          top: '0px',
                        }}
                        disabled={this.state.sliderDisabled}
                        marks={this.state.sliderMarks}
                      />
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
