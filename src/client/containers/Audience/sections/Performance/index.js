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

const getMinMax = (data, type = 'min') => {
  const min = type === 'min'
  return (
    (!!data &&
      Object.keys(data).reduce((result, key) => {
        const dataMaxMin = data[key].reduce(
          (dataVal, dataKey) =>
            (min
            ? dataKey.toolTip < dataVal
            : dataKey.toolTip > dataVal)
              ? dataKey.toolTip
              : dataVal,
          0
        )
        return (min
        ? dataMaxMin < result
        : dataMaxMin > result)
          ? dataMaxMin
          : result
      }, 0)) ||
    0
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
    this.props.getAudiencePerformanceData({
      min: val[0],
      max: val[1],
      ...params,
    })
  }

  callBack = (data, moduleKey) => {
    this.setState({
      params: data,
    })
    this.props.getAudiencePerformanceData(data)
  }

  render() {
    const {
      params: { metric },
      slider: [min, max],
    } = this.state

    const {
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
        borderColor: `${
          colors.textColor
        }   transparent transparent transparent`,
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
        borderColor: `${
          colors.textColor
        }   transparent transparent transparent`,
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

    const maxVal = getMinMax(data, 'max')

    const minVal = getMinMax(data, 'min')

    const normalizedData =
      (!!data &&
        Object.keys(data).reduce((acc, key) => {
          acc[key] = data[key].map((val) => ({
            toolTip: normalize(val.toolTip, minVal, maxVal, 0, 1000000),
          }))
          return acc
        }, {})) ||
      null

    return (
      <Module
        isEmpty={
          !loading &&
          (_.isEmpty(data) ||
            (!!data &&
              Object.values(data).every((valArr) =>
                valArr.every((v) => !v.toolTip)
              )))
        }
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
            <div className={'col-4'}>
              <div className={style.bubbleCont}>
                <BubbleChart
                  maximumIterationCount={1000}
                  size={[800, 600]}
                  fromPercentages={true}
                  options={{
                    toolTipWidth: 200,
                    toolTipHeight: 75,
                    visualWidth: 100,
                    visualHeight: 50,
                  }}
                >
                  {!!male &&
                    male.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={
                          parseInt(
                            ((!!normalizedData &&
                              !!normalizedData['male'] &&
                              normalizedData['male'][i].toolTip) ||
                              0) / 100
                          ) *
                            0.0015 +
                          10
                        }
                        fill={colors.bodyBackground}
                        stroke="#5292E5"
                      >
                        <Visual>
                          <span className={style.bubbleVisual}>
                            {bubble.visual}
                          </span>
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {`${metricSuffix(bubble.toolTip)} ${metric}`}
                          </div>
                        </ToolTip>
                      </Bubble>
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
              </div>
            </div>
            <div className={'col-4'}>
              <div className={style.bubbleCont}>
                <BubbleChart
                  maximumIterationCount={1000}
                  size={[800, 600]}
                  fromPercentages={true}
                  options={{
                    toolTipWidth: 200,
                    toolTipHeight: 75,
                    visualWidth: 100,
                    visualHeight: 50,
                  }}
                >
                  {!!female &&
                    female.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={
                          parseInt(
                            ((!!normalizedData &&
                              !!normalizedData['female'] &&
                              normalizedData['female'][i].toolTip) ||
                              0) / 100
                          ) *
                            0.0015 +
                          10
                        }
                        fill={colors.bodyBackground}
                        stroke="#2FD7C4"
                      >
                        <Visual>
                          <span className={style.bubbleVisual}>
                            {bubble.visual}
                          </span>
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {`${metricSuffix(bubble.toolTip)} ${metric}`}
                          </div>
                        </ToolTip>
                      </Bubble>
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
              </div>
            </div>
            <div className={'col-4'}>
              <div className={style.bubbleCont}>
                <BubbleChart
                  maximumIterationCount={1000}
                  size={[800, 600]}
                  fromPercentages={true}
                  options={{
                    toolTipWidth: 200,
                    toolTipHeight: 75,
                    visualWidth: 100,
                    visualHeight: 50,
                  }}
                >
                  {!!both &&
                    both.map((bubble, i) => (
                      <Bubble
                        key={'bubble-' + i}
                        radius={
                          parseInt(
                            ((!!normalizedData &&
                              !!normalizedData['both'] &&
                              normalizedData['both'][i].toolTip) ||
                              0) / 100
                          ) *
                            0.0015 +
                          10
                        }
                        fill={colors.bodyBackground}
                        stroke="#8562F3"
                      >
                        <Visual>
                          <span className={style.bubbleVisual}>
                            {bubble.visual}
                          </span>
                        </Visual>
                        <ToolTip>
                          <div className={style.bubbleTooltip}>
                            {bubble.visual}
                          </div>
                          <div className={style.bubbleTooltip}>
                            {`${metricSuffix(bubble.toolTip)} ${metric}`}
                          </div>
                        </ToolTip>
                      </Bubble>
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
              </div>
            </div>
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
