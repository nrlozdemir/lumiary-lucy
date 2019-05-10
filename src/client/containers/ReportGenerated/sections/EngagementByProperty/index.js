import React from 'react'
//import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import SelectFilters from 'Components/SelectFilters'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const GeneratedReportFilteringSection = ({
  data: { doughnutData, stackedChartData, doughnutRoundData },
  selectDuration,
  handleSelectFilters,
}) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div
          className={style.radialChartsContainer}
          style={{
            backgroundColor: colors.moduleBackground,
            color: colors.textColor,
            boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
          }}
        >
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
                <DoughnutChart
                  width={270}
                  height={270}
                  data={doughnutData}
                  cutoutPercentage={58}
                  fillText="Total Percentage"
                  dataLabelFunction="insertAfter"
                  dataLabelInsert="%"
                  labelPositionRight
                  labelsData={[
                    { data: '0-15 seconds', color: '#2FD7C4' },
                    { data: '15-30 seconds', color: '#8562F3' },
                    { data: '30-45 seconds', color: '#5292E5' },
                    { data: '45-60 seconds', color: '#acb0be' },
                  ]}
                />
              </div>
            </div>
            <div>
              <StackedBarChart barData={stackedChartData} />
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default GeneratedReportFilteringSection
