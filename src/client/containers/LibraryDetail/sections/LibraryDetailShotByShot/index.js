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
  makeSelectSelectedVideoID,
} from 'Reducers/libraryDetail'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import ProgressBar from 'Components/ProgressBar'
import RadarChart from 'Components/Charts/LibraryDetail/RadarChart'
import { ThemeContext } from 'ThemeContext/themeContext'
import Scrubber from 'Components/Sliders/Scrubber'
import XCircle from 'Components/Icons/XCircle'
import { mediaUrl } from 'Utils/globals'
import { ucfirst } from 'Utils'
import SliderWithScrubber from 'Components/Sliders/SliderWithScrubber'
import style from './style.scss'
import { makeSelectAuthProfile } from 'Reducers/auth'
import RouterLoading from 'Components/RouterLoading'

const shotSliderWidth = 504

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: null,
    }

    this.shotClick = this.shotClick.bind(this)
    this.shotSliderClick = this.shotSliderClick.bind(this)
    this.sliderAction = this.sliderAction.bind(this)
  }

  componentDidMount() {}

  sliderAction(i) {
    const calculateLeft = i * shotSliderWidth * -1
    this.setState(
      {
        sliderImageLeft: calculateLeft,
      },
      () => {
        this.sliderImages.style.left = calculateLeft
        const ref = this.sliderThumbs.children[0].children[0].childNodes[0]

        for (let k = 0; k < ref.childNodes.length; k++) {
          ref.childNodes[k].classList.remove(style.sliderImageActive)
          ref.childNodes[k].classList.add(style.sliderImageCurrent)
        }
        ref.childNodes[i].classList.remove(style.sliderImageCurrent)
        ref.childNodes[i].classList.add(style.sliderImageActive)
      }
    )
    //const { backgroundImage } = ref.childNodes[i].children[0].children[0].style
    //const currentImage = backgroundImage.replace(/\(|\)|url|\"/gi, '')
  }

  shotClick(i) {
    const val = {
      shotId: i,
      brandUuid: this.props.authProfile.brand.uuid,
      videoUuid: this.props.selectedVideo,
    }

    this.setState(
      {
        selectedImage: i,
      },
      () => {
        this.props.getShotInfoRequest(val)
        this.props.getRadarChartRequest(val)
        this.props.getPeopleRequest(val)
        this.sliderAction(i)
      }
    )
  }

  shotSliderClick(i) {
    this.shotClick(i)
  }

  render() {
    const {
      shots,
      shotInfoData,
      radarChartData,
      peopleData,
      loading,
    } = this.props
    const { selectedImage } = this.state

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

    const shotValues = (!!shots && Object.values(shots)) || []

    const dataIsEmpty =
      !shotValues.length ||
      (!!shotValues.length && shotValues.every((s) => !s.frameUrls))

    const peopleValues = (!!peopleData && Object.values(peopleData)) || []

    const peopleIsEmpty =
      !peopleValues.length ||
      (!!peopleValues.length &&
        peopleValues.every(
          (v) =>
            !v.uuid ||
            !v.gender ||
            ((!!v.ages && !v.ages.confidence) || !v.ages)
        ))

    const objectIsEmpty =
      shotInfoData &&
      shotInfoData.shot &&
      shotInfoData.shot.labels &&
      shotInfoData.shot.labels.length > 0
        ? false
        : true

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
                            ref={(el) => (this.sliderImages = el)}
                            style={{
                              width:
                                Object.values(shots).length * shotSliderWidth,
                            }}
                          >
                            {shots &&
                              Object.values(shots).length > 0 &&
                              Object.values(shots).map((shot, i) => {
                                const frameShotUrl =
                                  shot.frameUrls && shot.frameUrls[0]
                                    ? `${mediaUrl}/${shot.frameUrls[0]}`
                                    : null

                                return frameShotUrl ? (
                                  <div
                                    key={i}
                                    className={style.shotSliderImage}
                                  >
                                    <img src={frameShotUrl} />
                                  </div>
                                ) : null
                              })}
                          </div>
                        </div>
                        <div
                          ref={(el) => (this.sliderThumbs = el)}
                          className="mt-32 mb-24"
                        >
                          {shots && Object.values(shots).length > 0 && (
                            <SliderWithScrubber
                              name="sliderThumbs"
                              clickEvent={this.shotSliderClick}
                              shots={Object.values(shots)}
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
                            {peopleIsEmpty === false && (
                              <Scrubber vertical width={570} height={368}>
                                {peopleValues.map((info, i) => {
                                  const { ages, gender, uuid } = info
                                  return !gender ||
                                    !uuid ||
                                    !ages.confidence ? null : (
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
                                          src={`${mediaUrl}/lumiere/${
                                            this.props.authProfile.brand.uuid
                                          }/${this.props.selectedVideo}/${
                                            this.state.selectedImage
                                          }/`}
                                          className={classnames(
                                            style.imageItem,
                                            'grid-container'
                                          )}
                                        />
                                      </div>
                                      <div className="col-7-no-gutters">
                                        <div className="pt-20">
                                          <div
                                            className={
                                              style.progressbarContainer
                                            }
                                            key={i}
                                          >
                                            <div className={style.barOptions}>
                                              <p>{ucfirst(gender)}</p>
                                              <p>
                                                {(
                                                  ages.confidence * 100
                                                ).toFixed(0)}
                                                % Accurate
                                              </p>
                                            </div>
                                            <ProgressBar
                                              width={(
                                                ages.confidence * 100
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
                                            className={
                                              style.progressbarContainer
                                            }
                                            key={i}
                                          >
                                            <div className={style.barOptions}>
                                              <p>{ages.min} Y/O</p>
                                              <p>
                                                {ages.min.toFixed(0)}% Accurate
                                              </p>
                                            </div>
                                            <ProgressBar
                                              width={(
                                                ages.confidence * 100
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
                                  )
                                })}
                              </Scrubber>
                            )}
                            {peopleIsEmpty === true && (
                              <div className={style.tabsEmptyData}>
                                No Data Available
                              </div>
                            )}
                          </div>
                        </TabPanel>
                        <TabPanel className={style.tabPanelReset}>
                          <div className={classnames(style.tabPanel, 'mt-16')}>
                            {objectIsEmpty === false && (
                              <Scrubber vertical width={570} height={368}>
                                {shotInfoData.shot.labels.map((info, i) => (
                                  <div
                                    className={classnames(
                                      style.tabPanelItem,
                                      'grid-container',
                                      {
                                        'mb-16':
                                          i !==
                                          shotInfoData.shot.labels.length - 1,
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
                                        src={`${mediaUrl}/lumiere/${
                                          this.props.authProfile.brand.uuid
                                        }/${this.props.selectedVideo}/${
                                          this.state.selectedImage
                                        }/${shotInfoData.shot.frames[i]}`}
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
                            )}
                            {objectIsEmpty === true && (
                              <div className={style.tabsEmptyData}>
                                No Data Available
                              </div>
                            )}
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
                        shots={shotValues}
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
                    {dataIsEmpty && !loading && (
                      <div className={style.emptyData}>No Data Available</div>
                    )}
                    {loading && (
                      <div className={style.emptyData}>
                        <RouterLoading />
                      </div>
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
  authProfile: makeSelectAuthProfile(),
  selectedVideo: makeSelectSelectedVideoID(),
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
