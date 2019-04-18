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
    <div className="col-6 bg-dark-grey-blue shadow-1" style={{height: "600px"}}>

    </div>
  </div>
)

export default LibraryDetailChartHeader
