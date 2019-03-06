import React from 'react'
import { Field } from 'redux-form'

import style from './style.scss'
import { selectOptions } from './options'

import SelectFilters from 'Components/SelectFilters'
import ColorTemperatureChart from 'Components/ColorTemperatureChart'

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
          {colorTempData && (
            <ColorTemperatureChart colorTempData={colorTempData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LibraryDetailColorTemperature
