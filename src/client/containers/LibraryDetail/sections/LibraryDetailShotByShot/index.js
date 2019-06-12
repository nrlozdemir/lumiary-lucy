import React from 'react'
import classnames from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, selectShotInfo } from 'Reducers/libraryDetail'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SingleItemSlider from 'Components/Sliders/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import { ThemeContext } from 'ThemeContext/themeContext'
import Scrubber from 'Components/Sliders/Scrubber'
import XCircle from 'Components/Icons/XCircle'
import { mediaUrl } from 'Utils/globals'
import style from './style.scss'

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
      sliderValue: 0,
      shots: this.props.shots || [],
      shotsTotalWidth: 1118,
      viewportShots: [],
      viewportSize: 0,
      viewportDurations: {},
      sliderMarks: {},
      rightPaneHeight: 480
    }
    this.refs = []
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
    this.setState({
      selectedImage: i,
    })

    this.props.getShotInfoRequest(i)
    this.props.getRadarChartRequest(i)
    const { height } = this.slider.getBoundingClientRect()
    const totalHeight = Math.floor(height) + 48 - 85 - 20 - 15 // + top margin - tabs area - right top+bottom margins - bottom margin
    this.setState({
      rightPaneHeight: totalHeight
    })
  }

  onChangeSlider(e) {
    let sliderValue
    let leftMargin = 0 //calculate left margin if needed

    this.setState({
      sliderValue: 0,
      sliderLeftPosition: 0,
    })
    return false
  }

  componentDidMount() {
    const minShotWidth = 24
    const maxShotWidth = 148
    const tickCount = 11
    let sliderMarks = []
    let sliderMarksToState = {}
    let shotMargin = 5 // with first item left margin
    let shotsTotalWidth = 0
    let viewportDurations = {}
    let viewportLeftOver = {}
    let viewportTempShots = {}
    let viewportTempShotsTotalWidth = {}
    let viewportShots = []
    const viewportSize = 1118 - ((tickCount + 1) * shotMargin)

    const shots = Object.values(this.state.shots)

    if (shots && shots.length > 0) {
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
  
      viewportShots && viewportShots.map((el, i) => {
        shotsTotalWidth += el.width + shotMargin
      })
  
      this.setState({
        shotsTotalWidth: shotsTotalWidth + shotMargin,
        viewportShots: viewportShots,
        viewportSize: viewportSize,
        viewportDurations: viewportDurations,
        sliderMarks: sliderMarksToState
      })
    } 
  }

  render() {
    const { radarData, shotInfo } = this.props
    const { selectedImage, viewportShots, sliderMarks, shotsTotalWidth } = this.state

    const radarChartData = {
      "labels":[
         "#fff20d",
         "#f8b90b",
         "#eb7919",
         "#dd501d",
         "#cc2226",
         "#b83057",
         "#923683",
         "#79609b",
         "#3178b0",
         "#229a78",
         "#13862b",
         "#aac923"
      ],
      "datasets":[
         {
            "data":[
               65,
               59,
               34,
               81,
               56,
               40,
               65,
               59,
               34,
               81,
               56
            ]
         },
         {
            "data":[
               28,
               48,
               40,
               19,
               96,
               74,
               65,
               59,
               34,
               81,
               56
            ]
         }
      ]
   }


    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => {
          return (
            <div
              className="grid-container col-12 mt-72 mb-72"
              ref={el => this.slider = el}
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
                          <Scrubber vertical width={570} height={this.state.rightPaneHeight}>
                            {shotInfo && shotInfo.shot && shotInfo.shot.labels && shotInfo.shot.labels.map((info, i) => (
                              <div
                                className={classnames(
                                  style.tabPanelItem,
                                  'grid-container',
                                  {
                                    'mb-16': i !== shotInfo.shot.labels.length - 1,
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
                                    src={`${mediaUrl}/lumiere/6421cdac-d5eb-4427-a267-b9be2e232177/e2843ddb-4ba1-4062-acd9-2ffbe302a183/0/${shotInfo.shot.frames[i]}`}
                                    className="img-responsive"
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
                                          <p>{(info.confidence*100).toFixed(0)}% Accurate</p>
                                        </div>
                                        <ProgressBar
                                          width={(info.confidence*100).toFixed(0)}
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
                          {radarChartData && (<RadarChart data={radarChartData} />)}
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
                        width={1119}
                        marks={sliderMarks}
                        totalWidth={shotsTotalWidth}
                      >
                        <div
                          className={style.sliderWrapper}
                          style={{
                            left: 0,
                            width: shotsTotalWidth,
                          }}
                        >
                          {viewportShots && viewportShots.map((shot, i) => (
                            <React.Fragment key={i}>
                              <div className={style.image}>
                                <div
                                  style={{
                                    width: `${shot.width.toFixed(2)}px`,
                                    borderColor: colors.shotByShotBackground,
                                  }}
                                  className={style.setCenter}
                                >
                                  <div
                                    className={style.originalImage}
                                    style={{
                                      width: `${shot.width.toFixed(2)}px`,
                                      height: '160px',
                                      backgroundImage: `url(${shot.image})`,
                                      backgroundSize: `160px 160px`,
                                      borderColor: colors.shotByShotBackground,
                                    }}
                                  />
                                </div>
                                <img
                                  src={shot.image}
                                  style={{
                                    height: '160px'
                                  }}
                                  className={style.hover}
                                  onClick={() => { this.handleClick(i) }}
                                />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </Scrubber>
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

const mapStateToProps = createStructuredSelector({
  shotInfoData: selectShotInfo(),
})

function mapDispatchToProps(dispatch) {
  return {
    getShotInfoRequest: (shotId) => dispatch(actions.getShotInfoRequest(shotId)),
    getRadarChartRequest: (shotId) => dispatch(actions.getRadarChartRequest(shotId)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryDetailShotByShot)
