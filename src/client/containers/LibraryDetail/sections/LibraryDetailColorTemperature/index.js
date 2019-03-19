import React from 'react'
import classnames from 'classnames'

import style from './style.scss'

import SelectFilters from 'Components/SelectFilters'
import { ColorTemperature as Chart } from 'Components/ColorTemperatureChart/ColorTemperature'

const LibraryDetailColorTemperature = ({
  colorTempData,
  handleSelectFilters,
  selectDate,
}) => {
  return (
    <div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
      <div className={style.radialChartsContainer}>
        <div className={style.temperatureHeader}>
          <div>
            <h2>Color Temperature / Sentiment Comparison</h2>
          </div>
          <div className="d-flex align-items-center justify-space-between">
            <div className="d-flex align-items-center mr-32">
              <span className={style.redRound} />
              <p>This Video</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.duskRound} />
              <p>Library Average</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.purpleRound} />
              <p>Industry</p>
            </div>
          </div>
          <div className={style.inputWrapper}>
            <SelectFilters
              handleSelectFilters={handleSelectFilters}
              selectClasses="custom-select"
              selectDate={selectDate}
              selectDateShow={true}
            />
          </div>
        </div>
        <div className={style.temperatureContentContainer}>
          {(colorTempData || []).map((temp, index) => (
            <div
              className={classnames('col-4', style.chartWrapper)}
              key={'temp-chart-' + index}>
              <Chart temp={temp} />
              <div className={style.chartInfo}>{temp.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LibraryDetailColorTemperature
