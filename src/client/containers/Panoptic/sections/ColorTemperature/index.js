import React from 'react'

import style from './style.scss'
import { platforms, selectOneOptions, selectTwoOptions } from './options'

import ColorTemperatureChart from 'Components/ColorTemperatureChart'
import SelectFilters from 'Components/SelectFilters'

import Module from 'Components/Module'

const PanopticColorTemperature = ({ colorTempData, callBack }) => (
  <Module
    moduleKey="ali"
    title="Video Releases vs Engagement"
    action={callBack}
    filters={[
      { type: 'timeRange', selectKey: 'color1', placeHolder: 'place holder' },
      {
        type: 'aspectRatio',
        selectKey: 'color2',
        placeHolder: 'place holder',
      },
    ]}
  >
    COLOR
  </Module>
)

export default PanopticColorTemperature
