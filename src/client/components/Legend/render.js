import React from 'react'
import Legend from './index'

import style from './style.scss'

export default (legend, legendEnd) => {
  if (!!legend && !legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div
        className={`d-flex align-items-center ${
          legendEnd ? 'justify-content-end' : 'justify-content-center'
        }`}
      >
        {legend.map((item, idx) => (
          <Legend
            key={`colorTempLegend_${idx}`}
            color={item.color}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}
