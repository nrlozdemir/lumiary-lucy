import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'

import VideoCard from 'Components/VideoCard/index.js'

import style from './style.scss'

class Compare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compareItems: [
        [
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
        ],
        [
          {
            title: 'title',
            value: 'value',
            chartValue: 60,
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
        ],
        [
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
            chartValue: 30,
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
          {
            title: 'title',
            value: 'value',
          },
        ],
      ],
    }
  }

  render() {
    const { match } = this.props
    const { compareItems } = this.state
    return (
      <React.Fragment>
        <div className={style.header}>
          <div className="ml-40">
            <Link to={`/library/${match.params.videoId}`}>
              <span className="icon-Left-Arrow-Circle" />
              Back To Video
            </Link>
          </div>
          <div>Compare mode</div>
          <div className="mr-40">SELECT</div>
        </div>
        <div className="grid-container col-12 mr-20 ml-20 mt-72 mb-72">
          <VideoCard
            video={{
              title: (
                <div className={style.cardTitle}>
                  <span>Best Library Video</span>
                  <span>664,501k Likes</span>
                </div>
              ),
              thumbnailUrl: 'https://picsum.photos/282/154?image=19',
            }}
            options={{
              size: 4,
              presentationCard: true,
              barColor: 'cool-blue',
            }}
          />
          <VideoCard
            video={{
              title: (
                <div className={style.cardTitle}>
                  <span>This Video</span>
                  <span>481,797k Likes</span>
                </div>
              ),
              thumbnailUrl: 'https://picsum.photos/282/154?image=20',
            }}
            options={{
              size: 4,
              presentationCard: true,
              barColor: 'coral-pink',
            }}
          />
          <VideoCard
            video={{
              title: (
                <div className={style.cardTitle}>
                  <span>Best Market Video</span>
                  <span>863,102k Likes</span>
                </div>
              ),
              thumbnailUrl: 'https://picsum.photos/282/154?image=21',
            }}
            options={{
              size: 4,
              presentationCard: true,
              barColor: 'lighter-purple',
            }}
          />
          {compareItems.map((compareItem, index) => (
            <div key={index} className="col-4">
              <div className={style.compareItems}>
                {compareItem.map((item, index) => (
                  <div key={index} className={style.compareItem}>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                    {item.chartValue && (
                      <div className={style.doughnutChartContainer}>
                        <Doughnut
                          options={{
                            cutoutPercentage: 85,
                            tooltips: {
                              enabled: false,
                            },
                            legend: {
                              display: false,
                            },
                          }}
                          width={100}
                          height={100}
                          data={{
                            labels: ['Red', 'Green'],
                            datasets: [
                              {
                                data: [item.chartValue, 100 - item.chartValue],
                                borderColor: 'transparent',
                                backgroundColor: ['#ff556f', '#51adc0'],
                                hoverBackgroundColor: ['#ff556f', '#51adc0'],
                              },
                            ],
                          }}
                        />
                        <div>
                          <span>{item.chartValue}%</span>
                          <span>Difference</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

const withConnect = connect(
  null,
  null
)

export default compose(withConnect)(Compare)
