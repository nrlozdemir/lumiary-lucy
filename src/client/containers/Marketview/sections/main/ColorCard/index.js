import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewBubbleChart } from 'Reducers/marketview'
import { Link } from 'react-router-dom'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import { socialIconSelector } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'
import RightArrowCircle from 'Components/Icons/RightArrowCircle'
import { isEmpty } from 'lodash'

import style from 'Containers/Marketview/style.scss'

class ColorCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.getBubbleChartRequest()
  }

  render() {
    const { bubbleColors } = this.state
    const {
      bubbleChartData: { data, loading, error },
    } = this.props

    const isDataEmpty =
      (!loading &&
        (!data ||
          !!data & !data.length ||
          (!!data && !!data.length && data.every((obj) => obj.value === 0)))) ||
      isEmpty(data)

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.marketViewCard}
            style={{
              backgroundColor: colors.modalBackground,
              color: colors.textColor,
            }}
          >
            {isDataEmpty && (
              <div
                className={style.marketViewCardEmpty}
                style={{ backgroundColor: colors.moduleBackgroundOpacity }}
              >
                No Data Available
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
                Past Month
              </span>
            </div>
            <div className={style.bubbleChart}>
              {!!data && !!data.length && (
                <BubbleChart
                  maximumIterationCount={1000}
                  size={[800, 600]}
                  fromPercentages={true}
                  options={{ toolTipWidth: 200, toolTipHeight: 75 }}
                >
                  {data.map((bubble, i) => (
                    <Bubble
                      key={'bubble-' + i}
                      radius={(parseInt(bubble.value) / 100) * 0.0015 + 15}
                      fill={colors.bodyBackground}
                      stroke={bubble.color}
                    >
                      <Visual>
                        <span
                          className={
                            socialIconSelector(bubble.name) +
                            ' ' +
                            style.bubbleVisual
                          }
                        />
                      </Visual>
                      <ToolTip>
                        <div className={style.bubbleTooltip}>{bubble.name}</div>
                        <div className={style.bubbleTooltip}>
                          {bubble.value / 1000}
                          {bubble.value < 1000 ? '' : 'k'} views
                        </div>
                      </ToolTip>
                    </Bubble>
                  ))}
                </BubbleChart>
              )}
            </div>
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
            <div className={style.marketViewCardDescription}>
              Based on the number of shares for competitors across all platforms
            </div>
            <Link
              to="/marketview/platform"
              className={style.marketViewCardLink}
              style={{
                backgroundColor: colors.moduleBorder,
                color: colors.textColor,
              }}
            >
              ${`View Platform Metrics`}
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
