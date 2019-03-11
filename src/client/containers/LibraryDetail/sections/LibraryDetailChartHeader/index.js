import React from 'react'
import { Bar } from 'react-chartjs-2'

import style from './style.scss'
import { barDataOptions } from './options'
import Video from '../VideoComponent'

const LibraryDetailChartHeader = ({ barData, videoUrl, title, socialIcon }) => (
  <div className="grid-container mr-20 ml-20 mt-72" style={{ display: 'flex' }}>
    <div className="col-6" style={{ position: 'relative' }}>
      <Video src={videoUrl} title={title} socialIcon={socialIcon} />
    </div>
    <div className="col-6 bg-dark-grey-blue shadow-1">
      <div className={style.chartHeader}>
        <p>Social Data Comparison</p>
        <div className={style.legend}>
          <div className={style.legendInner}>
            <span className="bg-coral-pink" />
            This video
          </div>
          <div className={style.legendInner}>
            <span className="bg-cool-blue" />
            Average Video
          </div>
        </div>
      </div>
      <Bar data={barData} width={500} options={barDataOptions} height={185} />
      <div className={style.chartLabels}>
        <div className={style.label}>
          <span className="font-primary text-bold font-size-24 display-block">
            827.8k
          </span>
          <span className="color-white font-secondary-second font-size-12 display-block mt-4">
            Views
          </span>
        </div>
        <div className={style.label}>
          <span className="font-primary text-bold font-size-24 display-block">
            481.7k
          </span>
          <span className="color-white font-secondary-second font-size-12 display-block mt-4">
            Likes
          </span>
        </div>
        <div className={style.label}>
          <span className="font-primary text-bold font-size-24 display-block">
            265.2k
          </span>
          <span className="color-white font-secondary-second font-size-12 display-block mt-4">
            Comments
          </span>
        </div>
        <div className={style.label}>
          <span className="font-primary text-bold font-size-24 display-block">
            126.3k
          </span>
          <span className="color-white font-secondary-second font-size-12 display-block mt-4">
            Shares
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default LibraryDetailChartHeader
