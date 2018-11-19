import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'Reducers/home'
import { actions as marketActions } from 'Reducers/marketview'
import SubNav from '../views/subNav'
import cx from 'classnames'
import style from '../styles.scss'
import VideoSlider from 'Components/Sliders/VideoSlider';
import Card from "Components/Card";
import BarChart from "Components/Charts/BarChart";
import TabShow from "../../Library/Views/tabShow";
import { pieData, lineData } from "../../Library/options";
import LineChart from "Components/Charts/LineChart";
// import PropTypes from 'prop-types'

const videoList = [
  {
    poster: '//static.quickframe.com/homepage/lumascape/3.jpg',
    id: 'kumascape3',
    video: '//media.quickframe.com/video/video/6324.mp4'
  },
  {
    poster: '//static.quickframe.com/homepage/lumascape/4.jpg',
    id: 'lumascape4',
    video: '//media.quickframe.com/video/video/13433.mp4'
  },
  {
    poster: '//static.quickframe.com/homepage/lumascape/12.jpg',
    id: 'lumascape12',
    video: '//media.quickframe.com/video/video/15991.mp4'
  },
  {
    poster: '//static.quickframe.com/homepage/lumascape/1.jpg',
    id: 'lumascape1',
    video: '//media.quickframe.com/video/video/7485.mp4'
  }
]
class Competitor extends Component {

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
		};

		const yLabels = {
			0 : '1-2 Scenes', 2 : '3-5 Scenes', 4 : '6-10 Scenes', 6 : '10-20 Scenes'
		};
    return (
      <div className={cx(style.marketView, style.competitor)}>
        <SubNav />
        <div className={style.container}>

					<div className="mb-25">
						<LineChart height="40px" options={{
								legend: {
									display: false
								},
								scales:{
									xAxes: [{
											display: false
									}],
									yAxes: [{
										ticks: {
												callback: function(value, index, values) {
													// for a value (tick) equals to 8
													return yLabels[value];
													// 'junior-dev' will be returned instead and displayed on your chart
												}
										}
									}]
								}
							}} />
					</div>

          <div className="col-1">
						&nbsp;
					</div>
          <div className="col-11 mt-10 pb-10">
            <div className={style.upContainer}>
              <div className={style.videoContainer}>
                <VideoSlider
                  items={videoList}
                />
              </div>
              <div className={style.videoInfo}>
                <div className={style.videoHeader}>
                  <h2 className={style.header}>My July’s Faves</h2>
                  <div className={style.social}>
                    <span className={"qf-iconFacebook " + style.activeIcon} />
                    <span className={"qf-iconInstagram " + style.activeIcon} />
                    <span className={"qf-iconSnapchat " + style.deactiveIcon} />
                    <span className={"qf-iconTwitter " + style.deactiveIcon} />
                    <span className={"qf-iconYotube " + style.deactiveIcon} />
                    <span className={"qf-iconPinterest " + style.deactiveIcon} />
                  </div>
                </div>
                <Card removeHeader customBodyClass={"bg-charcoal-grey pl-25 " + style.cardView}>
                  <div className="m-10">
                    <div className={"col-12 " + style.title}>
                      <div className="float-right">
                        <p className={style.videoBriefLegend}>
                          <span className={style.roundGrey} />
                          This Video
								            <span className={style.roundTealish} />
                          Your Average Video
							            </p>
                      </div>
                    </div>
                    <div className="col-1-3">
                      <BarChart
                        width="3"
                        height="4"
                        data={[30]}
                        avarage="50"
                        labels={["1M Views"]}
                        isGradient
                        gradientColors={["#161620", "#2f2e3d"]}
                        options={{
                          plugins: {
                            datalabels: {
                              display: false
                            }
                          },
                          tooltips: {
                            enabled: false
                          },
                          legend: {
                            display: false
                          },
                          scales: {
                            yAxes: [
                              {
                                display: false,
                                ticks: {
                                  min: 0,
                                  max: 100,
                                  stepSize: 10
                                }
                              }
                            ],
                            xAxes: [
                              {
                                barPercentage: 0.95,
                                categorySpacing: 0,
                                gridLines: {
                                  display: false
                                }
                              }
                            ]
                          }
                        }}
                      />
                    </div>
                    <div className="col-1-3">
                      <BarChart
                        width="3"
                        height="4"
                        data={[76]}
                        avarage="75"
                        labels={["60k Likes"]}
                        isGradient
                        gradientColors={["#161620", "#2f2e3d"]}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          tooltips: {
                            enabled: false
                          },
                          plugins: {
                            datalabels: {
                              display: false
                            }
                          },

                          legend: {
                            display: false
                          },
                          scales: {
                            yAxes: [
                              {
                                display: false,
                                ticks: {
                                  min: 0,
                                  max: 100,
                                  stepSize: 10
                                }
                              }
                            ],
                            xAxes: [
                              {
                                barPercentage: 0.95,
                                categorySpacing: 0,
                                gridLines: {
                                  display: false
                                }
                              }
                            ]
                          }
                        }}
                      />
                    </div>
                    <div className="col-1-3">
                      <BarChart
                        width="3"
                        height="4"
                        data={[45]}
                        avarage="60"
                        labels={["123K Shares"]}
                        yLabels={["1M", "500K", "100K", "80K", "60K", "40K", "10K", "0"]}
                        isGradient
                        gradientColors={["#161620", "#2f2e3d"]}
                        options={{
                          tooltips: {
                            enabled: false
                          },
                          plugins: {
                            datalabels: {
                              display: false
                            }
                          },
                          legend: {
                            display: false
                          },
                          scales: {
                            yAxes: [
                              {
                                display: false,
                                gridLines: {
                                  display: false
                                },

                                ticks: {
                                  min: 0,
                                  max: 100,
                                  stepSize: 10
                                }
                              }
                            ],
                            xAxes: [
                              {
                                barPercentage: 0.95,
                                gridLines: {
                                  display: true
                                }
                              }
                            ]
                          }
                        }}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(Object.assign({}, actions, marketActions), dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Competitor)
