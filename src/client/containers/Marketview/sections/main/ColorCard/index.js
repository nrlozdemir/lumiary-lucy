import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectMarketviewBubbleChart } from 'Reducers/marketview'
import { Link } from 'react-router-dom'

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
    console.log('bubbleChartData', bubbleChartData)
    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Color</div>
        <div className={style.marketViewCardDescription}>
          Top Performing Platform
        </div>
        <div className={style.marketViewCardDate}>
          <span>Past 3 Months</span>
        </div>
        <div className={style.bubbleChart}>
          {bubbleChartData.length > 0 &&
            bubbleChartData.map((item, i) => (
              <div key={i} className={style.bubbleChartItem}>
                <style>
                  {`.${style.bubbleChartItem}:nth-child(${i + 1}){
                                                border-color: ${item.color};
                                            }.${
                                              style.bubbleChartItem
                                            }:nth-child(${i + 1}):hover{
                                                background-color: ${item.color};
                                            }`}
                </style>
                <div
                  className={`${style.bubbleChartIcon} icon-${
                    item.icon
                  }-Bubble`}
                />
                <div className={style.bubbleChartTooltip}>
                  <span>{item.name}</span>
                  <span>{item.value} Likes</span>
                </div>
              </div>
            ))}
        </div>
        <div className={style.colors}>
          {bubbleChartOptions.map((color, i) => {
            const network = bubbleChartData.find((data) => data.color === color)
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
          <span>
            Based on the number of shares for competitors across all platforms
          </span>
        </div>
        <Link to="/marketview/competitor" className={style.marketViewCardLink}>
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
