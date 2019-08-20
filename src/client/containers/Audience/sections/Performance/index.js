import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudiencePerformance } from 'Reducers/audience'
import Module from 'Components/Module'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import RangeWithBadge from 'Components/Form/RangeWithBadge'
import classnames from 'classnames'
import { socialIconSelector, metricSuffix, normalize } from 'Utils'
import _ from 'lodash'
import style from 'Containers/Audience/style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import MultipleNoDataModule from 'Components/MultipleNoDataModule'

const WrapperModule = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

class Performance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: [0, 100],
      params: {},
    }
    this.updateSlider = _.debounce(this.updateSlider, 250)
  }

  updateSlider(val) {
    const { params } = this.state
    const { type, getAudiencePerformanceData } = this.props
    getAudiencePerformanceData({
      min: val[0],
      max: val[1],
      ...params,
      type,
    })
  }

  callBack = (data, moduleKey) => {
    const { type, getAudiencePerformanceData } = this.props
    this.setState({
      params: data,
    })
    getAudiencePerformanceData({ ...data, type })
  }

  render() {
    const {
      params: { metric },
      slider: [min, max],
    } = this.state

    const {
      type,
      audiencePerformanceData: {
        data: { both, female, male },
        data,
        loading,
        error,
      },
      themeContext: { colors },
    } = this.props

    const handleStyle = [
      {
        width: '10px',
        height: '10px',
        borderStyle: 'solid',
        borderWidth: '20px 10px 0 10px',
        borderColor: `${colors.textColor}   transparent transparent transparent`,
        borderRadius: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 4px 2px #000)',
        WebkitFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        MozFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        OFilter: 'drop-shadow(0px 2px 4px 2px #000)',
      },
      {
        width: '10px',
        height: '10px',
        borderStyle: 'solid',
        borderWidth: '20px 10px 0 10px',
        borderColor: `${colors.textColor}   transparent transparent transparent`,
        backgroundColor: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        filter: 'drop-shadow(0px 2px 4px 2px #000)',
        WebkitFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        MozFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        OFilter: 'drop-shadow(0px 2px 4px 2px #000)',
        marginLeft: '-12px',
      },
    ]

    const trackStyle = [
      {
        height: '16px',
        backgroundColor: '#acb0be',
      },
    ]

    const railStyle = {
      height: '16px',
      borderRadius: '8px',
      backgroundColor: colors.bodyBackground,
    }

    const dotStyle = {
      border: '0',
      width: '1px',
      height: '16px',
      backgroundColor: '#acb0be',
      top: 0,
      marginLeft: 0,
      display: 'none',
    }

    const isEmpty =
      !loading &&
      (_.isEmpty(data) ||
        (!!data &&
          Object.values(data).every((valArr) => {
            return Object.keys(valArr).length && valArr.every((v) => !v.value)
          })))

    return (
      <Module
        actionOnProp={type}
        isEmpty={isEmpty}
        customEmptyClasses={style.performanceEmpty}
        loading={loading}
        moduleKey={'Audience/Performance'}
        title="Performance By Age, Gender and Date"
        action={this.callBack}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'AP-plateng',
            placeHolder: 'Engagement by Platform',
            customOptions: [
              {
                label: 'Facebook',
                options: [{ value: 'facebook|views', label: 'Views' }],
              },
            ],
            defaultValue: { value: 'facebook|views', label: 'Views' },
          },
          {
            type: 'property',
            selectKey: 'AP-asd',
            placeHolder: 'Resolution',
          },
          {
            type: 'dateRange',
            selectKey: 'AP-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div
          className={classnames(
            style.audienceContainer,
            'grid-container mr-20 ml-20'
          )}
        >
          <div className="col-12-no-gutters">
            <MultipleNoDataModule>
              <WrapperModule
                datasetsIsEmpty={!!male && !Object.keys(male).length}
              >
                <BubbleChart
                  size={[340, 400]}
                  options={{
                    maximumIterationCount: 1000,
                    toolTipBackground: colors.audienceBubbleTooltipBackground,
                    toolTipArrowBackground:
                      colors.audienceBubbleTooltipBackground,
                    toolTipArrowShadow: colors.audienceBubbleTooltipBackground,
                    strokeWidth: 6,
                    gap: 1,
                    visualFontSize: 14,
                    toolTipFontSize: 10,
                    visualWidth: 100,
                    visualHeight: 50,
                    toolTipWidth: 150,
                    toolTipHeight: 140,
                    firstCircleTimesX: 1,
                    firstCircleTimesY: 1,
                  }}
                  firstAngle={30}
                >
                  {!!male &&
                    Object.keys(male).length &&
                    male.map((bubble, i) => (
                      <div key={i}>
                        <Bubble
                          key={'bubble-' + i}
                          radius={bubble.value}
                          fill={colors.bodyBackground}
                          stroke="#5292E5"
                        >
                          <Visual
                            style={{
                              background: colors.audienceBubbleBackground,
                            }}
                          >
                            <span
                              className={style.bubbleVisual}
                              style={{
                                fontSize: 13,
                                color: colors.audienceBubbleText,
                              }}
                            >
                              {bubble.visual}
                            </span>
                          </Visual>
                          <ToolTip>
                            <div className={style.bubbleTooltip}>
                              <div
                                className={style.header}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                  // audienceBubbleTooltipSeparator
                                }}
                              >
                                {`${bubble.percentage}% | ${bubble.visual} ${bubble.property}`}
                              </div>
                              <div
                                style={{
                                  width: '100%',
                                  height: '1px',
                                  background:
                                    colors.audienceBubbleTooltipSeparator,
                                }}
                              />
                              <div
                                className={style.body}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                }}
                              >
                                {`${bubble.percentage}% of males ${bubble.min}-${bubble.max} prefer videos that are ${bubble.visual} paced`}
                              </div>
                            </div>
                          </ToolTip>
                        </Bubble>
                      </div>
                    ))}
                </BubbleChart>
                <div className={style.chartSectionBadge}>
                  <span
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                    }}
                  >
                    Males
                  </span>
                </div>
              </WrapperModule>
              <WrapperModule
                style={{
                  borderLeft: `1px solid ${colors.moduleBorder}`,
                  borderRight: `1px solid ${colors.moduleBorder}`,
                }}
                datasetsIsEmpty={!!female && !Object.keys(female).length}
              >
                <BubbleChart
                  size={[340, 400]}
                  options={{
                    maximumIterationCount: 1000,
                    toolTipBackground: colors.audienceBubbleTooltipBackground,
                    toolTipArrowBackground:
                      colors.audienceBubbleTooltipBackground,
                    toolTipArrowShadow: colors.audienceBubbleTooltipBackground,
                    strokeWidth: 6,
                    gap: 1,
                    visualWidth: 100,
                    visualHeight: 50,
                    toolTipWidth: 150,
                    toolTipHeight: 140,
                    firstCircleTimesX: 1,
                    firstCircleTimesY: 1,
                  }}
                  firstAngle={30}
                >
                  {!!female &&
                    Object.keys(female).length &&
                    female.map((bubble, i) => (
                      <div key={i}>
                        <Bubble
                          key={'bubble-' + i}
                          radius={bubble.value}
                          fill={colors.bodyBackground}
                          stroke="#2FD7C4"
                        >
                          <Visual
                            style={{
                              background: colors.audienceBubbleBackground,
                            }}
                          >
                            <span
                              className={style.bubbleVisual}
                              style={{
                                fontSize: 13,
                                color: colors.audienceBubbleText,
                              }}
                            >
                              {bubble.visual}
                            </span>
                          </Visual>
                          <ToolTip>
                            <div className={style.bubbleTooltip}>
                              <div
                                className={style.header}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                  // audienceBubbleTooltipSeparator
                                }}
                              >
                                {`${bubble.percentage}% | ${bubble.visual} ${bubble.property}`}
                              </div>
                              <div
                                style={{
                                  width: '100%',
                                  height: '1px',
                                  background:
                                    colors.audienceBubbleTooltipSeparator,
                                }}
                              />
                              <div
                                className={style.body}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                }}
                              >
                                {`${bubble.percentage}% of females ${bubble.min}-${bubble.max} prefer videos that are ${bubble.visual} paced`}
                              </div>
                            </div>
                          </ToolTip>
                        </Bubble>
                      </div>
                    ))}
                </BubbleChart>
                <div className={style.chartSectionBadge}>
                  <span
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                    }}
                  >
                    Females
                  </span>
                </div>
              </WrapperModule>
              <WrapperModule
                datasetsIsEmpty={!!both && !Object.keys(both).length}
              >
                <BubbleChart
                  size={[340, 400]}
                  options={{
                    maximumIterationCount: 1000,
                    toolTipBackground: colors.audienceBubbleTooltipBackground,
                    toolTipArrowBackground:
                      colors.audienceBubbleTooltipBackground,
                    toolTipArrowShadow: colors.audienceBubbleTooltipBackground,
                    strokeWidth: 6,
                    gap: 1,
                    visualWidth: 100,
                    visualHeight: 50,
                    toolTipWidth: 150,
                    toolTipHeight: 140,
                    firstCircleTimesX: 1,
                    firstCircleTimesY: 1,
                  }}
                  firstAngle={30}
                >
                  {!!both &&
                    Object.keys(both).length &&
                    both.map((bubble, i) => (
                      <div key={i}>
                        <Bubble
                          key={'bubble-' + i}
                          radius={bubble.value}
                          fill={colors.bodyBackground}
                          stroke="#8562F3"
                        >
                          <Visual
                            style={{
                              background: colors.audienceBubbleBackground,
                            }}
                          >
                            <span
                              className={style.bubbleVisual}
                              style={{
                                fontSize: 13,
                                color: colors.audienceBubbleText,
                              }}
                            >
                              {bubble.visual}
                            </span>
                          </Visual>
                          <ToolTip
                            style={{
                              color: colors.tooltipRadarChartTextColor,
                            }}
                          >
                            <div className={style.bubbleTooltip}>
                              <div
                                className={style.header}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                  // audienceBubbleTooltipSeparator
                                }}
                              >
                                {`${bubble.percentage}% | ${bubble.visual} ${bubble.property}`}
                              </div>
                              <div
                                style={{
                                  width: '100%',
                                  height: '1px',
                                  background:
                                    colors.audienceBubbleTooltipSeparator,
                                }}
                              />
                              <div
                                className={style.body}
                                style={{
                                  color: colors.audienceBubbleTooltipText,
                                }}
                              >
                                {`${bubble.percentage}% of both ${bubble.min}-${bubble.max} prefer videos that are ${bubble.visual} paced`}
                              </div>
                            </div>
                          </ToolTip>
                        </Bubble>
                      </div>
                    ))}
                </BubbleChart>
                <div className={style.chartSectionBadge}>
                  <span
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                    }}
                  >
                    Both
                  </span>
                </div>
              </WrapperModule>
            </MultipleNoDataModule>
          </div>

          <div className="col-12-gutter-20" style={{ color: colors.textColor }}>
            <style>
              {`
                .customTooltip {
                  color: ${colors.textColor};
                }
                .customTooltip .rc-slider-tooltip-inner {
                  color: ${colors.textColor};
                }
              `}
              {(!!isEmpty || !!loading) &&
                `.customTooltip .rc-slider-tooltip-inner {
                    display: none;
                }
              `}
            </style>
            <RangeWithBadge
              customClass={'customRangeSlider'}
              minValue={0}
              maxValue={100}
              input={{ onChange: (val) => this.updateSlider(val) }}
              handleStyle={handleStyle}
              trackStyle={trackStyle}
              railStyle={railStyle}
              min={0}
              max={100}
              tipProps={{
                visible: true,
                overlayClassName: 'customTooltip',
                overlayStyle: {
                  background: 'none',
                  border: 'none',
                  boxShadow: 'none',
                },
                arrowContent: '',
              }}
              dotStyle={dotStyle}
              step={1}
              dots={true}
              marks={{
                0: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    0
                  </div>
                ),
                10: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    10
                  </div>
                ),
                20: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    20
                  </div>
                ),
                30: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    30
                  </div>
                ),
                40: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    40
                  </div>
                ),
                50: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    50
                  </div>
                ),
                60: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    60
                  </div>
                ),
                70: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    70
                  </div>
                ),
                80: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    80
                  </div>
                ),
                90: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    90
                  </div>
                ),
                100: (
                  <div
                    className="custom-dot"
                    style={{ color: colors.textColor }}
                  >
                    100
                  </div>
                ),
              }}
              customTicksUnvisible
            />
          </div>
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audiencePerformanceData: makeSelectAudiencePerformance(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Performance)
