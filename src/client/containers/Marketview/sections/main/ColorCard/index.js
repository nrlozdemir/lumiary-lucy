import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewBubbleChart } from 'Reducers/marketview'
import { Link } from 'react-router-dom'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import { socialIconSelector, metricSuffix, ucfirst } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import { isEmpty } from 'lodash'
import { dateRangeLabels } from 'Utils/globals'

import style from 'Containers/Marketview/style.scss'
import RouterLoading from 'Components/RouterLoading'

class ColorCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateRange: '3months',
      metric: 'views',
      bubbleColors: {
        red: '#cc2226',
        'orange-red': '#dd501d',
        orange: '#eb7919',
        'yellow-orange': '#f8b90b',
        yellow: '#fff20d',
        'yellow-green': '#aac923',
        green: '#13862b',
        'blue-green': '#229a78',
        'blue-purple': '#3178b0',
        purple: '#79609b',
        'red-purple': '#923683',
        magenta: '#b83057',
      },
    }
  }

  componentDidMount() {
    const { metric, dateRange } = this.state
    this.props.getBubbleChartRequest({ metric, dateRange })
  }

  render() {
    const { bubbleColors, metric, dateRange } = this.state
    const {
      bubbleChartData: { data, loading, error },
    } = this.props

    const isDataEmpty = (!loading && !data) || isEmpty(data)

    const totalChartValue =
      !isDataEmpty && data.reduce((total, { value }) => total + value, 0)

    const dateLabel = dateRangeLabels[dateRange]

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.marketViewCard}
            style={{
              backgroundColor: colors.modalBackground,
              color: colors.textColor,
              boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
            }}
          >
            <style>
              {`
              .${style.bubbleChart} div>svg>g>g>rect,polygon{
                fill: ${colors.tooltipBackground} !important;
              }
            `}
            </style>
            {(loading || (isDataEmpty && !loading)) && (
              <div
                className={style.marketViewCardEmpty}
                style={{ backgroundColor: colors.moduleBackgroundOpacity }}
              >
                {loading ? <RouterLoading /> : 'No Data Available'}
              </div>
            )}
            <div className={style.marketViewCardTitle}>Color</div>
            <div className={style.marketViewCardSubTitle}>
              Top Performing Platform
            </div>
            <div className={style.chartSectionBadge}>
              <span
                style={{
                  background: colors.labelBackground,
                  color: colors.labelColor,
                  boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                }}
              >
                {dateLabel}
              </span>
            </div>
            <div className={style.bubbleChart}>
              {!!data && !loading && !!data.length && totalChartValue ? (
                <BubbleChart
                  maximumIterationCount={100000}
                  size={[totalChartValue * 1.7, totalChartValue * 2]}
                  options={{
                    strokeWidth: totalChartValue * 0.025,
                    gap: totalChartValue / 180,
                    toolTipWidth: totalChartValue * 0.7,
                    toolTipHeight: totalChartValue * 0.3,
                    visualWidth: totalChartValue * 0.16,
                    visualHeight: totalChartValue * 0.16,
                    toolTipRadius: totalChartValue * 0.06,
                    toolTipGap: totalChartValue * 0.1,
                    toolTipArrowWidth: totalChartValue * 0.07,
                    toolTipArrowHeight: totalChartValue * 0.05,
                  }}
                >
                  {data.map((bubble, i) => (
                    <Bubble
                      key={'bubble-' + i}
                      // radius={(parseInt(bubble.value) / 100) * 0.0015 + 15}
                      radius={bubble.value}
                      fill={colors.bodyBackground}
                      stroke={bubbleColors[bubble.color]}
                    >
                      <Visual>
                        <span
                          className={
                            socialIconSelector(bubble.name, true) +
                            ' ' +
                            style.bubbleVisual
                          }
                          style={{
                            fontSize: totalChartValue * 0.07,
                            background: colors.textColor,
                            color: colors.moduleBackgroundHover,
                          }}
                        />
                      </Visual>
                      <ToolTip
                        style={{
                          background: colors.tooltipBackground,
                          color: colors.tooltipRadarChartTextColor,
                        }}
                      >
                        <div
                          className={style.bubbleTooltip}
                          style={{
                            fontSize: totalChartValue * 0.07,
                            color: colors.chartTooltipColor,
                          }}
                        >
                          {bubble.name}
                        </div>
                        <div
                          className={style.bubbleTooltip}
                          style={{
                            fontSize: totalChartValue * 0.07,
                            color: colors.chartTooltipColor,
                          }}
                        >
                          {`${metricSuffix(bubble.oldValue)} ${ucfirst(
                            metric
                          )}`}
                        </div>
                      </ToolTip>
                    </Bubble>
                  ))}
                </BubbleChart>
              ) : null}
            </div>
            {!isDataEmpty && !loading && (
              <div className={style.colors}>
                <style>{`.${style.hasTriangle}:before {border-color: ${
                  colors.textColor
                } transparent transparent transparent;}`}</style>
                {Object.keys(bubbleColors).map((colorKey, i) => {
                  const network = data.find((pf) => pf.color === colorKey)
                  return (
                    <span
                      key={i}
                      style={{ backgroundColor: bubbleColors[colorKey] }}
                      className={network && style.hasTriangle}
                    />
                  )
                })}
              </div>
            )}
            <div className={style.marketViewCardDescription}>
              {`An overview of the dominant color associated with the top number of ${metric} for videos on each platform for the ${dateLabel.toLowerCase()}.`}
            </div>
            <Link
              to="/marketview/platform"
              className={style.marketViewCardLink}
              style={{
                backgroundColor: colors.moduleBorder,
                color: colors.textColor,
              }}
            >
              View Platform Metrics
              <div className={style.icon}>
                <RightArrowCircle />
              </div>
            </Link>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  bubbleChartData: makeSelectMarketviewBubbleChart(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(ColorCard)
