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
import ConfidenceImage from './ConfidenceImage'

const shotSliderWidth = 504

class LibraryDetailShotByShot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderImageLeft: 0,
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
      sliderImageLeft: calculateLeft
    })
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
      loading,
      peopleData: { data: peopleData, loading: peopleLoading },
      shotInfoData: { data: shotInfoData, loading: shotInfoLoading },
      radarChartData: { data: radarChartData, loading: radarChartLoading },
    } = this.props
    const { selectedImage } = this.state

    const radarChartDataConfigured = {
      datasets: [
        {
          labels: radarChartData,
          data: radarChartData,
          '​​borderColor': '#ccc',
          '​​​​​pointBackgroundColor': '#505050',
          tooltip: false,
          pointBorderColor: '#505050',
          label: 'Color',
          '​​backgroundColor': 'rgba(172, 176, 190, 0.4)',
        },
      ],
      labels: [
        {
          name: 'Red',
          color: '#cc2226',
          selected: false,
        },
        {
          name: 'Red-Orange',
          color: '#dd501d',
          selected: false,
        },
        {
          name: 'Orange',
          color: '#eb7919',
          selected: false,
        },
        {
          name: 'Yellow-Orange',
          color: '#f8b90b',
          selected: false,
        },
        {
          name: 'Yellow',
          color: '#fff20d',
          selected: false,
        },
        {
          name: 'Yellow-Green',
          color: '#aac923',
          selected: false,
        },
        {
          name: 'Green',
          color: '#13862b',
          selected: false,
        },
        {
          name: 'Blue-Green',
          color: '#229a78',
          selected: false,
        },
        {
          name: 'Blue-Purple',
          color: '#79609b',
          selected: false,
        },
        {
          name: 'Purple',
          color: '#923683',
          selected: false,
        },
        {
          name: 'Red-Purple',
          color: '#b83057',
          selected: false,
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
              className={style.shotByShotGrid}
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
                  <div key={Math.random()} className="bg-black">
                    <div className={style.shotSliderWrapperContainer}>
                      <div className={style.shotSliderWrapper}>
                        <div
                          className={style.shotSliderContainer}
                          ref={(el) => (this.sliderImages = el)}
                          style={{
                            width:
                              Object.values(shots).length * shotSliderWidth,
                            left: this.state.sliderImageLeft
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
                                <div key={i} className={style.shotSliderImage}>
                                  <img src={frameShotUrl} />
                                </div>
                              ) : null
                            })}
                        </div>
                      </div>
                      <div
                        ref={(el) => (this.sliderThumbs = el)}
                        className="mt-32 mb-24"
                        style={{
                          width: 'max-content',
                          overflow: 'hidden',
                        }}
                      >
                        {!!shotValues.length && (
                          <SliderWithScrubber
                            name="sliderThumbs"
                            clickEvent={this.shotSliderClick}
                            shots={loading ? [] : shotValues}
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
                              imageActive: style.sliderImageActive,
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
                            selectedShot={this.state.selectedImage}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
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
                          {peopleIsEmpty === false && !peopleLoading && (
                            <Scrubber vertical width={'100%'} height={368}>
                              {peopleValues.map((info, i) => {
                                const { ages, gender, uuid } = info
                                const imgUrl = `${mediaUrl}/lumiere/${
                                  this.props.authProfile.brand.uuid
                                }/${this.props.selectedVideo}/${
                                  this.state.selectedImage
                                }/`
                                return !gender ||
                                  !uuid ||
                                  !ages.confidence ? null : (
                                  <ConfidenceImage
                                    imgUrl={imgUrl}
                                    colors={colors}
                                    label={ucfirst(gender)}
                                    confidence={(ages.confidence * 100).toFixed(
                                      0
                                    )}
                                    minAge={ages.min}
                                  />
                                )
                              })}
                            </Scrubber>
                          )}
                          {peopleLoading && (
                            <div className={style.tabsEmptyData}>
                              <RouterLoading />
                            </div>
                          )}
                          {peopleIsEmpty === true && !peopleLoading && (
                            <div className={style.tabsEmptyData}>
                              No Data Available
                            </div>
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel className={style.tabPanelReset}>
                        <div className={classnames(style.tabPanel, 'mt-16')}>
                          {objectIsEmpty === false && !shotInfoLoading && (
                            <Scrubber vertical width={'100%'} height={368}>
                              {shotInfoData.shot.labels.map((info, i) => {
                                const imgUrl = `${mediaUrl}/lumiere/${
                                  this.props.authProfile.brand.uuid
                                }/${this.props.selectedVideo}/${
                                  this.state.selectedImage
                                }/${shotInfoData.shot.frames[i]}`

                                return (
                                  <ConfidenceImage
                                    imgUrl={imgUrl}
                                    colors={colors}
                                    key={`object_${i}`}
                                    label={info.label}
                                    confidence={(info.confidence * 100).toFixed(
                                      0
                                    )}
                                  />
                                )
                              })}
                            </Scrubber>
                          )}
                          {shotInfoLoading && (
                            <div className={style.tabsEmptyData}>
                              <RouterLoading />
                            </div>
                          )}
                          {objectIsEmpty === true && !shotInfoLoading && (
                            <div className={style.tabsEmptyData}>
                              No Data Available
                            </div>
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className={style.radarChartContainer}>
                          {radarChartDataConfigured && (
                            <RadarChart
                              data={radarChartDataConfigured}
                              key={Math.random()}
                            />
                          )}
                          {radarChartLoading && (
                            <div className={style.tabsEmptyData}>
                              <RouterLoading />
                            </div>
                          )}
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </React.Fragment>
              ) : (
                <div className={style.sliderContainer}>
                  <h2 className={style.sliderHeader}>Shot by Shot</h2>
                  <div
                    className={classnames({
                      [style.emptyContainer]: dataIsEmpty === true || loading,
                    })}
                    style={{ position: 'relative' }}
                  >
                    <div
                      className={style.shotByShotMask}
                      style={{
                        backgroundColor: colors.shotByShotMaskBackgroundColor,
                        borderColor: colors.shotByShotMaskBorderColor,
                      }}
                    />
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
