import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewBubbleChart } from 'Reducers/marketview'
import { Link } from 'react-router-dom'
import { BubbleChart, Bubble, Visual, ToolTip } from '@saypr/bubble-chart/react'
import { socialIconSelector } from 'Utils'
import { ThemeContext } from 'ThemeContext/themeContext'

import style from 'Containers/Marketview/style.scss'
class ColorCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bubbleChartOptions: [
        '#cc2226',
        '#dd501d',
        '#eb7919',
        '#f8b90b',
        '#fff20d',
        '#aac923',
        '#13862b',
        '#229a78',
        '#3178b0',
        '#79609b',
        '#923683',
        '#b83057',
      ],
    }
  }

  componentDidMount() {
    this.props.getBubbleChartRequest()
  }

  render() {
    const { bubbleChartOptions } = this.state
    const { bubbleChartData } = this.props
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
              {bubbleChartData.length > 0 && (
                <BubbleChart
                  maximumIterationCount={1000}
                  size={[800, 600]}
                  fromPercentages={true}
                  options={{ toolTipWidth: 200, toolTipHeight: 75 }}
                >
                  {bubbleChartData.map((bubble, i) => (
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
                          {bubble.value / 1000}k views
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
              {bubbleChartOptions.map((color, i) => {
                const network = bubbleChartData.find(
                  (data) => data.color === color
                )
                return (
                  <span
                    key={i}
                    style={{ backgroundColor: color }}
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
              View Platform Metrics
              <div className={style.icon}>
                <span className="icon-Right-Arrow-Circle">
                  <span className="path1" />
                  <span className="path2" />
                  <span className="path3" />
                </span>
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
