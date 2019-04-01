import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectPanoptic } from 'Reducers/panoptic'
import { HorizontalBar } from 'react-chartjs-2'

import style from '../../style.scss'
import SelectFilters from 'Components/SelectFilters'

const plugins = [
  {
    beforeDraw: function (chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        var ctx = chart.chart.ctx
        var chartArea = chart.chartArea

        ctx.save()
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor
        ctx.fillRect(
          chartArea.left,
          chartArea.top,
          chartArea.right - chartArea.left,
          chartArea.bottom - chartArea.top
        )
        ctx.restore()
      }
    },
  },
]

class GenderSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectResolution: '',
      selectLikes: '',
      selectDate: '',
    }
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectResolution, selectLikes, selectDate } = this.state
    const { panoptic: { audienceData: { genderData } } } = this.props;

    return (
      <div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
        <div className={style.temperatureHeader + ' col-12'}>
          <div>
            <h2>Video Properties Split By Gender</h2>
          </div>
          <div className="d-flex align-items-center justify-space-between">
            <div className="d-flex align-items-center mr-32">
              <span className={style.redRound} />
              <p>Male</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.duskRound} />
              <p>Female</p>
            </div>
          </div>
          <div className={style.selects}>
            <SelectFilters
              selectResolutionShow
              selectResolution={selectResolution}
              handleSelectFilters={this.handleSelectFilters}
              selectLikesShow
              selectLikes={selectLikes}
              selectDateShow
              selectDate={selectDate}
            />
          </div>
        </div>
        <div className="col-12" style={{ display: 'flex', padding: '40px 0' }}>
          <HorizontalBar
            width={4}
            height={1}
            data={genderData}
            plugins={plugins}
            options={{
              plugins: {
                datalabels: false
              },
              legend: {
                display: false,
              },
              chartArea: {
                backgroundColor: '#242b49',
              },
              tooltips: {
                enabled: false,
              },
              scales: {
                yAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: 'white',
                      padding: 20,
                    },
                    stacked: true,
                    barThickness: 15,
                  },
                ],
                xAxes: [
                  {
                    padding: 10,
                    display: true,
                    gridLines: {
                      display: true,
                      color: '#5a6386',
                      zeroLineColor: '#5a6386',
                      drawTicks: false,
                    },
                    ticks: {
                      beginAtZero: true,
                      fontColor: 'white',
                      padding: 20,
                      stepSize: 50,
                      min: -100,
                      max: 100,
                      callback: function (value) {
                        return Math.abs(value) + '%'
                      },
                    },
                    stacked: true,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic(),
})

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(GenderSection)
