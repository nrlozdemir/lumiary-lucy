import React from 'react'
import classnames from 'classnames'

import style from './style.scss'
import SelectFilters from 'Components/SelectFilters'
import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import ProgressBar from 'Components/ProgressBar'

const CompareShares = ({ radarData, handleSelectFilters, selectDate }) => {
  const compareSharesContainer = classnames(
    'shadow-1 col-12 mt-48 mb-48',
    style.compareSharesContainer
  )
  console.log('radarData', radarData)
  return (
    <div className={compareSharesContainer}>
      <div className={style.componentTitle}>
        <div>
          <h2>Dominant Color On Facebook and YouTube By Shares</h2>
        </div>
        <div className={style.inputWrapper}>
          <form className={style.form}>
            <SelectFilters
              handleSelectFilters={handleSelectFilters}
              selectClasses="custom-select"
              selectDate={selectDate}
              selectDateShow={true}
            />
          </form>
        </div>
      </div>
      <div className={style.radarChartComparison}>
        <div className={style.radarComponent}>
          <p className={style.radarTitle}>{radarData[0].type}</p>
          <div className={style.radarComponentContainer}>
            <RadarChart data={radarData[0].datas} />
          </div>
          <div className={style.progressBarArea}>
            {radarData[0].progress.map((progressItem, index) => (
              <div
                key={index}
                className={classnames(style.reverse, style.progressBarInner)}
              >
                <p className={style.progressText}>
                  <span className={style.leftTitle}>
                    <span
                      className={style.dot}
                      style={{ background: progressItem.color }}
                    />
                    <span>{progressItem.leftTitle}</span>
                  </span>
                  <span className={style.rightTitle}>
                    {progressItem.rightTitle}
                  </span>
                </p>
                <ProgressBar
                  width={progressItem.value}
                  customBarClass={style.progressBar}
                  customPercentageClass={style.percentageBlue}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={style.radarComponent}>
          <p className={style.radarTitle}>{radarData[1].type}</p>
          <div className={style.radarComponentContainer}>
            <RadarChart data={radarData[1].datas} />
          </div>
          <div className={style.progressBarArea}>
            {radarData[1].progress.map((progressItem, index) => (
              <div key={index} className={style.progressBarInner}>
                <p className={style.progressText}>
                  <span className={style.leftTitle}>
                    <span
                      className={style.dot}
                      style={{ background: progressItem.color }}
                    />
                    <span>{progressItem.leftTitle}</span>
                  </span>
                  <span className={style.rightTitle}>
                    {progressItem.rightTitle}
                  </span>
                </p>
                <ProgressBar
                  width={progressItem.value}
                  customBarClass={style.progressBar}
                  customPercentageClass={style.percentageBlue}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareShares
