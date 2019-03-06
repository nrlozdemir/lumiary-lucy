import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import style from 'Containers/Marketview/style.scss'
import { Pie } from 'react-chartjs-2'
import classnames from 'classnames'

class ColorCard extends Component {
  render() {
    return (
      <div className={style.marketViewCard}>
        <div className={style.marketViewCardTitle}>Pacing</div>
        <div className={style.marketViewCardDescription}>
          Top Competitor Similarities
        </div>
        <div className={style.marketViewCardDate}>
          <span>Past Month</span>
        </div>
        <div className={style.pieChartContainer}>
          <Pie
            height={240}
            width={240}
            options={{
              responsive: false,
              legend: {
                display: false,
              },
              plugins: {
                datalabels: false,
              },
              layout: {
                padding: 0,
              },
            }}
            data={{
              labels: ['Slowest', 'Slow', 'Medium', 'Fast'],
              datasets: [
                {
                  data: [70, 15, 10, 5],
                  borderColor: '#303a5d',
                  backgroundColor: ['#51adc0', '#8567f0', '#d0506c', '#acb0be'],
                },
              ],
            }}
          />
        </div>
        <div className={style.marketViewCardSubTitle}>Medium Paced</div>
        <div
          className={classnames(
            style.colorListSmall,
            style.colorListHorizontal,
            style.colorList
          )}
        >
          <div className={style.colorListItem}>Slowest</div>
          <div className={style.colorListItem}>Slow</div>
          <div className={style.colorListItem}>Medium</div>
          <div className={style.colorListItem}>Fast</div>
        </div>

        <div className={style.marketViewCardDescription}>
          <span>
            Based on the number of likes for competitors across all platforms
          </span>
        </div>
        <Link to="/marketview/platform" className={style.marketViewCardLink}>
          View Competitor Metrics
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

export default ColorCard
