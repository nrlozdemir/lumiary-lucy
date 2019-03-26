import React from 'react'

import style from './style.scss'
import { platforms, selectOneOptions, selectTwoOptions } from './options'

import ColorTemperatureChart from 'Components/ColorTemperatureChart'
import SelectFilters from 'Components/SelectFilters'

const GeneratedReportColorTemperature = ({
  colorTempData,
  handleSelectFilters,
  selectWarmColor,
}) => (
  <div className={style.radialChartsContainer}>
    <div className={style.temperatureHeader}>
      <div>
        <h2 className="font-secondary-first">
          Color Temperature / Sentiment Comparison
        </h2>
      </div>
      <div className={style.inputWrapper}>
        <form className={style.form}>
          <SelectFilters
            handleSelectFilters={handleSelectFilters}
            selectClasses="custom-select"
            selectWarmColor={selectWarmColor}
            selectWarmColorShow={true}
          />
        </form>
      </div>
    </div>
    <div className={style.temperatureContentContainer}>
      {colorTempData && (
        <ColorTemperatureChart
          showDescription={false}
          borderLess
          verticalText
          colorTempData={colorTempData}
        />
      )}
    </div>
    <div className={style.infoWrapperContainer}>
      <div className={style.infoWrapper}>
        <div className={style.infoHandle}>
          <span className={style.infoText}>Views</span>
        </div>
      </div>
      <div className={style.infoWrapper}>
        <div className={style.infoHandle}>
          <span className={style.infoText}>Likes</span>
        </div>
      </div>
      <div className={style.infoWrapper}>
        <div className={style.infoHandle}>
          <span className={style.infoText}>Comment</span>
        </div>
      </div>
      <div className={style.infoWrapper}>
        <div className={style.infoHandle}>
          <span className={style.infoText}>Shares</span>
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center justify-content-center ph-48 mv-48">
      {platforms &&
        platforms.map((platform, index) => (
          <div key={index} className="d-flex align-items-center mr-32">
            <span
              className={style.round}
              style={{ backgroundColor: `${platform.color}` }}
            />
            <p className={style.platformName}>{platform.name}</p>
          </div>
        ))}
    </div>
  </div>
)

export default GeneratedReportColorTemperature
