import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import Slider from "rc-slider"
import cn from 'classnames'

import style from "./style.scss"

import SingleItemSlider from "Components/SingleItemSlider"
import ProgressBar from "Components/ProgressBar"
import RadarChart from "Components/Charts/LibraryDetail/RadarChart"

class LibraryDetailShotByShot extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedImage: null,
      sliderVal: 0,
      maxValue: 1000,
    }
  }

  onChangeSlider(e) {
    this.setState({ sliderVal: e }, this.slide.current.scrollTo(e * 5, 0))
  }

  render() {
    const { sliderWithThumbnails, slideImages, radarData, videoList } = this.props
    const { selectedImage } = this.state
    const sliderTabContainer = cn('col-12 mt-48 mb-48', style.sliderTabContainer )
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
                  <span
                    className={style.cancelButton + " qf-iconX"}
                    onClick={() => this.setState({ selectedImage: false })}
                  />
                </TabList>
                <TabPanel>
                  <div className={style.tabPanel}>
                    {slideImages.map((image, i) => (
                      <div
                        className={style.tabPanelItem + " grid-container mt-16"}
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
                      className={style.tabPanelItem + " grid-container mt-16"}
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
                    <RadarChart
                      data={radarData}
                    />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="col-12 shadow-1 mt-48 mb-48 bg-dark-grey-blue pb-32">
            <div className="col-12">
              <h2 className="font-secondary-first text-center pt-48 pb-48 font-size-18">
                Shot by Shot
              </h2>
              <div className={style.sliderContainer} ref={this.slide}>
                {videoList.map((video, i) => (
                  <div
                    className={style.image}
                    onClick={() => this.setState({ selectedImage: i })}
                    key={i}
                  >
                    <img src={video} className={style.originalImage} />
                    <img src={video} className={style.hover} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 mt-16 mb-16 library-detail-slider">
              <Slider
                step={null}
                defaultValue={8}
                onAfterChange={val => this.onChangeSlider(val)}
                handleStyle={{
                  width: "293px",
                  height: "16px",
                  borderRadius: "10px",
                  marginTop: "0px"
                }}
                trackStyle={{
                  height: "16px",
                  backgroundColor: "transparent"
                }}
                min={-5}
                max={114}
                railStyle={{
                  height: "16px",
                  borderRadius: "10px",
                  backgroundColor: "#242b49"
                }}
                dotStyle={{
                  width: "1px",
                  height: "16px",
                  border: 0,
                  top: "0px"
                }}
                marks={{
                  10: { label: <p className={style.dot}>0:00</p> },
                  20: { label: <p className={style.dot}>0:10</p> },
                  30: { label: <p className={style.dot}>0:20</p> },
                  40: { label: <p className={style.dot}>0:30</p> },
                  50: { label: <p className={style.dot}>0:40</p> },
                  60: { label: <p className={style.dot}>0:50</p> },
                  70: { label: <p className={style.dot}>0:60</p> },
                  80: { label: <p className={style.dot}>0:70</p> },
                  90: { label: <p className={style.dot}>0:80</p> },
                  100: { label: <p className={style.dot}>0:90</p> }
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LibraryDetailShotByShot
