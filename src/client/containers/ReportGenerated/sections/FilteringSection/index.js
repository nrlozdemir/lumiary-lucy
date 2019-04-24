import React from 'react'
import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import SelectFilters from 'Components/SelectFilters'

import style from './style.scss'
import DoughnutChart from 'Components/Charts/Panoptic/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'

const GeneratedReportFilteringSection = ({
  data: { doughnutData, stackedChartData, doughnutRoundData },
  selectDuration,
  handleSelectFilters,
}) => {
  return (
    <div className={style.radialChartsContainer}>
      <div className={style.temperatureHeader}>
        <div>
          <h2>Engagement By Property Over Time</h2>
        </div>
        <div className={style.inputGroup}>
          <form className={style.form}>
            <SelectFilters
              handleSelectFilters={handleSelectFilters}
              selectClasses="custom-select"
              selectDuration={selectDuration}
              selectDurationShow={true}
            />
          </form>
        </div>
      </div>
      <div className="d-flex align-items-center justify-space-between ph-48 pb-48">
        <div className={style.radialAndStackChartWrapper}>
          <div>
            <DoughnutChart data={doughnutData.average} />
          </div>
          <div>
            {doughnutRoundData &&
              doughnutRoundData.map((roundData, index) => (
                <div
                  className={classnames(
                    'd-flex',
                    'align-items-center',
                    style.lables
                  )}
                  key={index}
                >
                  <span
                    className={style.round}
                    style={{ backgroundColor: `${roundData.color}` }}
                  />
                  <span className={style.secondsText}>{roundData.data}</span>
                </div>
              ))}
          </div>
        </div>
        <div>
          <StackedBarChart barData={stackedChartData} />
        </div>
      </div>
    </div>
  )
}

export default GeneratedReportFilteringSection
