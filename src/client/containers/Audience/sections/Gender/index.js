import React from 'react'
import style from '../../style.scss'
import Select from 'Components/Form/Select'
import { HorizontalBar } from 'react-chartjs-2'
const data = {
  labels: ['Slowest', 'Slow', 'Medium', 'Fast'],
  datasets: [
    {
      label: 'Dataset 1',
      backgroundColor: '#d0506c',
      borderColor: '#d0506c',
      borderWidth: 1,
      data: [-20, -30, -25, -13],
    },
    {
      label: 'Dataset 2',
      backgroundColor: '#51adc0',
      borderColor: '#51adc0',
      data: [50, 80, 60, 50],
    },
  ],
}
const plugins = [
  {
    beforeDraw: function(chart, easing) {
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

const GenderSection = () => (
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
        <Select
          name="Pacing"
          customClass="custom-select"
          placeholder="Pacing"
          value={''}
          onChange={(option) => this.handleChange(option, 'Pacing')}
          options={[{ value: 'All Pacing', label: 'All Pacing' }]}
        />
        <Select
          name="Likes"
          customClass="custom-select"
          placeholder="Likes"
          value={''}
          onChange={(option) => this.handleChange(option, 'Likes')}
          options={[{ value: 'All Likes', label: 'All Likes' }]}
        />
        <Select
          name="Past Month"
          customClass="custom-select"
          placeholder="Past Month"
          value={''}
          onChange={(option) => this.handleChange(option, 'Past Month')}
          options={[{ value: 'All Past Month', label: 'All Past Month' }]}
        />
      </div>
    </div>
    <div className="col-12" style={{ display: 'flex', padding: '40px 0' }}>
      <HorizontalBar
        width={4}
        height={1}
        data={data}
        plugins={plugins}
        options={{
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
                  callback: function(value) {
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

export default GenderSection
