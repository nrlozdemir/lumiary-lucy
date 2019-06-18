import React from 'react'
import classnames from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  actions,
  selectShotInfoData,
  selectColorsData,
  selectPeopleData,
} from 'Reducers/libraryDetail'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
//import SingleItemSlider from 'Components/Sliders/SingleItemSlider'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import { ThemeContext } from 'ThemeContext/themeContext'
import Scrubber from 'Components/Sliders/Scrubber'
import XCircle from 'Components/Icons/XCircle'
import { mediaUrl } from 'Utils/globals'
import { capitalizeFirstLetter } from 'Utils'
import SliderWithScrubber from 'Components/Sliders/SliderWithScrubber'
import style from './style.scss'

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
      selectedImageClassName: '',
      sliderValue: null,
      sliderImageSrc: null,
    }

    this.shotClick = this.shotClick.bind(this)
    this.shotSliderClick = this.shotSliderClick.bind(this)
  }

  componentDidMount() {
    this.props.getShotInfoRequest(1)
    this.props.getRadarChartRequest(1)
    this.props.getPeopleRequest(1)
  }

  onChangeSlider(e) {
    this.setState({
      sliderValue: 0,
    })
  }

  shotClick(i) {

    this.setState({
      selectedImage: i,
    })
    
    /*
    

    this.setState({
      selectedImage: i,
    })

    this.shotSliderClick(i)
    */

    //const { height } = this.slider.getBoundingClientRect()
  }

  shotSliderClick(i) {

    this.setState({
      selectedImage: 1
    }, () => {

      const ref = this.slider2.children[0].children[0].childNodes[0]

      for (let k = 0; k < ref.childNodes.length; k++) {
        const ref = this.slider2.children[0].children[0].childNodes[0]

        for (let k = 0; k < ref.childNodes.length; k++) {
          ref.childNodes[k].classList.remove(style.sliderImageActive)
          ref.childNodes[k].classList.add(style.sliderImageCurrent)
        }
        ref.childNodes[i].classList.remove(style.sliderImageCurrent)
        ref.childNodes[i].classList.add(style.sliderImageActive)

        this.setState({
          selectedImage: i,
          sliderImageSrc: 'https://picsum.photos/id/2/320/320'
        })
        return true
      }
    })
  }

  render() {
    const { shots, shotInfo, radarChartData, peopleData } = this.props
    const { selectedImage, sliderImageSrc } = this.state

    console.log(this.props)

    const radarChartDataConfigured = radarChartData && {
      labels: [
        '#cc2226',
        '#dd501d',
        '#eb7919',
        '#f8b90b',
        '#aac923',
        '#fff20d',
        '13862b',
        '#229a78',
        '#79609b',
        '#923683',
        '#b83057',
        //"#3178b0",
      ],
      datasets: [
        {
          label: 'Shots',
          backgroundColor: 'rgb(82, 146, 229, 0.5)',
          borderColor: 'rgb(82, 146, 229, 1)',
          pointBackgroundColor: 'rgb(82, 146, 229, 0.5)',
          pointBorderColor: 'rgb(82, 146, 229, 1)',
          data: radarChartData,
        },
      ],
    }
    const dataIsEmpty = shots && Object.values(shots).length > 0 ? false : true

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
                <React.Fragment>
                  <div className={style.sliderTabContainer}>
                    <div
                      key={Math.random()}
                      className="col-6-no-gutters bg-black"
                    >
                      <div className="mt-48 ml-48 mr-48">
                        <div className={style.shotSliderWrapper}>
                          <div
                            className={style.shotSliderContainer}
                            style={{
                              width: Object.values(shots).length * 504,
                            }}
                          >
                            {shotInfo &&
                              shotInfo.shot &&
                              shotInfo.shot.frames &&
                              Object.values(shotInfo.shot.frames).map(
                                (el, i) => (
                                  <div className={style.shotSliderImage}>
                                    <img src={sliderImageSrc} />
                                  </div>
                                )
                              )}
                          </div>
                        </div>

                        <div
                          ref={(el) => (this.slider2 = el)}
                          className="mt-32 mb-24"
                        >
                          {shotInfo && shotInfo.shot && shotInfo.shot.frames && (
                            <SliderWithScrubber
                              name="slider2"
                              clickEvent={this.shotSliderClick}
                              shots={Object.values(shotInfo.shot.frames)}
                              shotMargin={4}
                              minShotWidth={12}
                              maxShotWidth={104}
                              shotHeight={56}
                              shotHoverWidth={104}
                              shotHoverHeight={56}
                              viewportWidth={492}
                              viewportHeight={100}
                              viewportBackgroundColor={
                                colors.shotByShotSliderImageBorder
                              }
                              ticks={12}
                              customClass={{
                                sliderWrapper: style.sliderWrapper,
                                imageWrapper: style.sliderSetCenter,
                                image: classnames(
                                  style.sliderImage,
                                  style.sliderImageCurrent
                                ),
                                imageHover: style.sliderHover,
                                originalImage: style.sliderOriginalImage,
                              }}
                              customStyle={{
                                originalImageBorderColor:
                                  colors.shotByShotSliderImageBorder,
                                imageWrapperBorderColor:
                                  colors.shotByShotSliderImageBorder,
                              }}
                              isEmpty={dataIsEmpty}
                              scrubberIsDot={true}
                              scrubberWidth={16}
                              scrubberHeight={16}
                              scrubberDotClassname={style.dotScrubber}
                            />
                          )}
                        </div>
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
                            <Tab selectedClassName={style.selectedTab}>
                              Color
                            </Tab>
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
                            <Scrubber vertical width={570} height={368}>
                              {peopleData &&
                                Object.values(peopleData).map((info, i) => (
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
                                            <p>
                                              {capitalizeFirstLetter(
                                                info.gender
                                              )}
                                            </p>
                                            <p>
                                              {(
                                                info.ages.confidence * 100
                                              ).toFixed(0)}
                                              % Accurate
                                            </p>
                                          </div>
                                          <ProgressBar
                                            width={(
                                              info.ages.confidence * 100
                                            ).toFixed(0)}
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
                                              {info.ages.min.toFixed(0)}%
                                              Accurate
                                            </p>
                                          </div>
                                          <ProgressBar
                                            width={(
                                              info.ages.confidence * 100
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
                        <TabPanel className={style.tabPanelReset}>
                          <div className={classnames(style.tabPanel, 'mt-16')}>
                            <Scrubber vertical width={570} height={368}>
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
                                              {(info.confidence * 100).toFixed(
                                                0
                                              )}
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
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h2 className={style.sliderHeader}>Shot by Shot</h2>
                  <div className={style.sliderContainer}>
                    <div
                      className={classnames({
                        [style.emptyContainer]: dataIsEmpty === true,
                      })}
                    >
                      <div className={style.shotByShotMask} />
                      <SliderWithScrubber
                        name="slider1"
                        clickEvent={this.shotClick}
                        shots={Object.values(shots)}
                        shotMargin={5}
                        minShotWidth={24}
                        maxShotWidth={148}
                        shotHeight={160}
                        shotHoverWidth={160}
                        shotHoverHeight={160}
                        viewportWidth={1118}
                        viewportHeight={230}
                        viewportBackgroundColor={'transparent'}
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
                          imageWrapperBorderColor: colors.shotByShotBackground,
                        }}
                        isEmpty={dataIsEmpty}
                        scrubberIsDot={false}
                      />
                    </div>
                    {dataIsEmpty === true && (
                      <div className={style.emptyData}>No Data Available</div>
                    )}
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
  shotInfoData: selectShotInfoData(),
  radarChartData: selectColorsData(),
  peopleData: selectPeopleData(),
})

function mapDispatchToProps(dispatch) {
  return {
    getShotInfoRequest: (shotId) =>
      dispatch(actions.getShotInfoRequest(shotId)),
    getRadarChartRequest: (shotId) =>
      dispatch(actions.getRadarChartRequest(shotId)),
    getPeopleRequest: (shotId) => dispatch(actions.getPeopleRequest(shotId)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryDetailShotByShot)
