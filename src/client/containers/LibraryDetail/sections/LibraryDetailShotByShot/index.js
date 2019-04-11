import React from 'react'
import cn from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Slider from 'rc-slider'

import style from './style.scss'

import SingleItemSlider from 'Components/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'

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
      sliderMarks: {
        0: "0:02:22",
        10: "0:01:18",
        20: "0:00:37",
        30: "0:00:56",
        40: "0:01:14",
        50: "0:00:33",
        60: "0:01:51",
        70: "0:00:10",
        80: "0:02:50",
        90: "0:01:47",
        100: "0:01:24"
      },
      scenes: [
        {
          sceneURL: "https://picsum.photos/160/160?image=76",
          duration: 160,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=29",
          duration: 60,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=71",
          duration: 240,
          sceneSecond: 40
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=37",
          duration: 190,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=11",
          duration: 130,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=89",
          duration: 160,
          sceneSecond: 54
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=52",
          duration: 90,
          sceneSecond: 80
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=69",
          duration: 70,
          sceneSecond: 62
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=28",
          duration: 120,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=76",
          duration: 80,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=29",
          duration: 60,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=71",
          duration: 200,
          sceneSecond: 40
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=81",
          duration: 150,
          sceneSecond: 59
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=9",
          duration: 200,
          sceneSecond: 45
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=89",
          duration: 200,
          sceneSecond: 56
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=43",
          duration: 140,
          sceneSecond: 64
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=35",
          duration: 160,
          sceneSecond: 38
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=41",
          duration: 90,
          sceneSecond: 42
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=47",
          duration: 130,
          sceneSecond: 72
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=151",
          duration: 180,
          sceneSecond: 66
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=76",
          duration: 160,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=29",
          duration: 60,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=71",
          duration: 240,
          sceneSecond: 40
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=37",
          duration: 190,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=11",
          duration: 130,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=89",
          duration: 160,
          sceneSecond: 54
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=52",
          duration: 90,
          sceneSecond: 80
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=69",
          duration: 70,
          sceneSecond: 62
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=28",
          duration: 120,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=76",
          duration: 80,
          sceneSecond: 70
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=29",
          duration: 60,
          sceneSecond: 90
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=71",
          duration: 200,
          sceneSecond: 40
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=81",
          duration: 150,
          sceneSecond: 59
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=9",
          duration: 200,
          sceneSecond: 45
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=89",
          duration: 200,
          sceneSecond: 56
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=43",
          duration: 140,
          sceneSecond: 64
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=35",
          duration: 160,
          sceneSecond: 38
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=41",
          duration: 90,
          sceneSecond: 42
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=47",
          duration: 130,
          sceneSecond: 72
        },
        {
          sceneURL: "https://picsum.photos/160/160?image=151",
          duration: 180,
          sceneSecond: 66
        }
      ]
    }
    this.slide = React.createRef()
  }

  handleClick(i, second){
    this.setState({
      selectedImage: i,
      sliderValue: second
    })
  }

  onChangeSlider(e) {
    e = parseInt(e)

    let scrollTo = ((e - (this.state.sliderHandleRightStep / 2)) * this.state.sliderStepWidth) * -1

    if(scrollTo > 0){
      scrollTo = 0
    }
    if((scrollTo * -1) + this.state.sliderViewportSize >= this.state.sliderTotalWidth){
      scrollTo = (this.state.sliderTotalWidth - this.state.sliderViewportSize) * -1
    }

    this.setState({
      sliderValue: e,
      sliderLeftPosition: scrollTo
    })

    let sliderValue;

    //calculate left margin if needed
		let leftMargin = 0

    if(e === 100){
      leftMargin = Math.round(this.state.sliderGrabberWidth)

      this.setState({
        sliderValue: 100,
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: `-${leftMargin}px`
        }
      })
    }
    else if(e + (this.state.sliderHandleRightStep / 2) > 100){
      sliderValue = Math.round(100 - (this.state.sliderHandleRightStep / 2))
      leftMargin = Math.round(((this.state.sliderViewportSize - (sliderValue * this.state.sliderViewportStepWidth)) * 2) - this.state.sliderGrabberWidth)

      if(leftMargin < 0){
        leftMargin = (this.state.sliderGrabberWidth / 2)
      }
      else{
        leftMargin = (this.state.sliderGrabberWidth / 2) + leftMargin
      }
      leftMargin = leftMargin.toFixed(0)

      this.setState({
        sliderValue: sliderValue,
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: `-${leftMargin}px`
        }
      })
    }
    else if(e - (Math.round(this.state.sliderHandleRightStep) / 2) < 1){
			console.log("in");
      this.setState({
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: '0px'
        },
        sliderValue: 0
      });
    }
    else if(e === 0){
      this.setState({
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: '2px'
        },
        sliderDisabled: true,
      }, () => {
        this.setState({
          sliderDisabled: false,
          sliderValue:0
        });
      });
    }
    else if(e !== 100 && e !== 0){
      this.setState({
        sliderHandleStyle: {
          ...this.state.sliderHandleStyle,
          marginLeft: parseInt((this.state.sliderGrabberWidth / 2) * -1) + 'px'
        }
      });
    }
  }

  componentDidMount(){
    const minShotWidth = 24
    const maxShotWidth = 148
    const viewportSize = 1120
    let totalWidth = 5 // with first item left margin
    let totalDuration = 0
    let durations = []

    this.state.scenes.map((element, index) => {
      durations.push(element.duration);
      return totalDuration += element.duration
    })

    const minShotDuration = Math.min(...durations)
    const maxShotDuration = Math.max(...durations)
    const shotDurationDifference = Math.ceil(maxShotDuration - minShotDuration)
    const shotDurationWidthDifference = Math.ceil(maxShotWidth - minShotWidth)
    const anySecondWidth = (shotDurationWidthDifference / shotDurationDifference).toFixed(2)

    let tempState = {}
    let shotWidth = 0

    this.state.scenes.map((element, index) => {
      tempState = this.state
      shotWidth = Math.floor(((tempState.scenes[index].duration - minShotDuration) * anySecondWidth) + minShotWidth)
      tempState.scenes[index].width = shotWidth
      totalWidth += shotWidth + 5 // add all right margins
      tempState.sliderTotalWidth = totalWidth

      this.setState(tempState)
    })

    //rcSliderWidth = parseInt(document.getElementsByClassName('rc-slider')[0].clientWidth); //calculate viewport for resposive
    const sliderViewportStepWidth = viewportSize / 100
    const sliderStepWidth = totalWidth / 100
    let rcGrabberWidth = (viewportSize / (totalWidth / viewportSize))
    if(rcGrabberWidth > viewportSize){
      rcGrabberWidth = viewportSize
    }
    const sliderHandleRightStep = 100 - ((viewportSize - rcGrabberWidth) / sliderViewportStepWidth).toFixed(2)

    //rebuild custom-marks
    let sliderMarks = this.state.sliderMarks
    let sliderMarksToState = {}
    Object.entries(sliderMarks).forEach(mark => {

      mark[0] = parseInt(mark[0]);
      if(mark[0] === 0){
        sliderMarksToState[mark[0]] = {
          style: {transform: "translateX(0%)"},
          label: <p className="customDot">{mark[1]}</p>
        }
      }
      else if(mark[0] === 100){
        sliderMarksToState[mark[0]] = {
          style: {transform: "translateX(-100%)"},
          label: <p className="customDot">{mark[1]}</p>
        }
      }
      else{
        sliderMarksToState[mark[0]] = {
          label: <p className="customDot">{mark[1]}</p>
        }
      }
    })

    this.setState({
      sliderViewportSize: viewportSize,
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
        width: (rcGrabberWidth - 3) + 'px',
        marginLeft: '0px'
      }
    })
  }

  render() {
    const {
      sliderWithThumbnails,
      slideImages,
      radarData,
      videoList,
    } = this.props
    const { selectedImage } = this.state
    const sliderTabContainer = cn(
      'col-12 mt-48 mb-48',
      style.sliderTabContainer
    )
    return (
      <div>
        {selectedImage ? (
          <div className={sliderTabContainer}>
            <div className="col-6-no-gutters bg-black">
              <div className="mt-48 ml-48 mr-48">
                <SingleItemSlider slideImages={sliderWithThumbnails} />
              </div>
            </div>
            <div className="col-6-no-gutters ">
              <Tabs>
                <TabList className={style.tabList}>
                  <Tab selectedClassName={style.selectedTab}>Demographics</Tab>
                  <Tab selectedClassName={style.selectedTab}>Objects</Tab>
                  <Tab selectedClassName={style.selectedTab}>Color</Tab>
                  <div className={style.cancelButton}>
                    <span
                      className="icon-X-Circle"
                      onClick={() => this.setState({ selectedImage: false })}
                    >
                      <span className="path1" />
                      <span className="path2" />
                      <span className="path3" />
                    </span>
                  </div>
                </TabList>
                <TabPanel>
                  <div className={style.tabPanel}>
                    {slideImages.map((image, i) => (
                      <div
                        className={style.tabPanelItem + ' grid-container mt-16'}
                        key={i}
                      >
                        <div className="col-5-no-gutters">
                          <img src={image.src} className="img-responsive" />
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
                      className={style.tabPanelItem + ' grid-container mt-16'}
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
          <div className="col-12 shadow-1 mt-48 mb-48 bg-dark-grey-blue">
            <div className="col-12">
              <h2 className={style.sliderHeader}>Shot by Shot</h2>
              <div className={style.sliderContainer} ref={this.slide}>
                <div className={style.sliderWrapper} style={{left: this.state.sliderLeftPosition, width: this.state.sliderTotalWidth}}>
                  {this.state.scenes.map((scene, i) => (
                    <div
                      className={style.image}
                      onClick={ () => { this.handleClick(i, scene.sceneSecond) } }
                      key={i}
                    >
                      <div style={{width: `${scene.width}px`}} className={style.setCenter}>
                        <div className={style.originalImage} style={{width: `${scene.width}px`, backgroundImage: `url(${scene.sceneURL})`}}></div>
                      </div>
                      <img src={scene.sceneURL} className={style.hover} />
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
                  handleStyle={this.state.sliderHandleStyle}
                  trackStyle={{
                    height: '16px',
                    backgroundColor: 'transparent',
                  }}
                  min={0}
                  max={100}
                  railStyle={{
                    height: '16px',
                    borderRadius: '10px',
                    backgroundColor: '#242b49',
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
  }
}

export default LibraryDetailShotByShot
