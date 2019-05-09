import React from 'react'
//import classnames from 'classnames'
import 'chartjs-plugin-datalabels'
import SelectFilters from 'Components/SelectFilters'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'

const GeneratedReportFilteringSection = ({
  data: { doughnutData, stackedChartData },
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
            <DoughnutChart
              width={270}
              height={270}
              data={{
								labels: [
									"0-15 seconds",
									"15-30 seconds",
									"30-45 seconds",
									"45-60 seconds"
								],
								datasets: [
									{
										data: doughnutData.datasets[0].data,
										backgroundColor: ["#acb0be", "#8562F3", "#5292E5", "#2FD7C4"],
										hoverBackgroundColor: ["#acb0be", "#8562F3", "#5292E5", "#2FD7C4"]
									}
								]
							}}
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
  )
}

export default GeneratedReportFilteringSection
