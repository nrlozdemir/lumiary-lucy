import React, { Component } from 'react'
import Module from 'Components/Module'
import { isDataSetEmpty } from 'Utils/datasets'
import 'chartjs-plugin-datalabels'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import StackedBarChart from 'Components/Charts/StackedBarChart'
import style from './style.scss'

import { chartColors } from 'Utils/globals'
import { isEmpty, isEqual } from 'lodash'

class EngagementByProperty extends Component {
  callBack = (data) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  shouldComponentUpdate(nextProps) {
    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    const {
      data: { data, loading },
    } = this.props

    return !isEqual(nextData, data) || loading !== nextLoading
  }

  render() {
    const {
      data: {
        data,
        data: { doughnutData, stackedChartData },
        loading,
        error,
      },
    } = this.props
    const isDoughnutEmpty = isDataSetEmpty(doughnutData)

    const hasNoData =
      !loading &&
      ((!!doughnutData &&
        !!stackedChartData &&
        isDoughnutEmpty &&
        isDataSetEmpty(stackedChartData)) ||
        isEmpty(data))

    return (
      <Module
        moduleKey={'BrandInsights/FilteringSection'}
        title="Engagement By Property Over Time"
        action={this.callBack}
        filters={[
          {
            type: 'property',
            selectKey: 'PFS-wxcvs',
            placeHolder: 'Property',
          },
        ]}
        isEmpty={hasNoData}
        loading={loading}
      >
        <div className={style.filteringSectionContainer}>
          <div className={style.radialAndStackChartWrapper}>
            <DoughnutChart
              width={270}
              height={270}
              data={!loading ? doughnutData : {}}
              cutoutPercentage={58}
              fillText={isDoughnutEmpty ? 'No Data' : 'Total Percentage'}
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionRight
              labelsData={
                (!loading &&
                  !!doughnutData &&
                  !!doughnutData.labels &&
                  doughnutData.labels.map((label, idx) => ({
                    data: label,
                    color: chartColors[idx],
                  }))) ||
                []
              }
            />
          </div>
          <div className={style.stackedChart}>
            <StackedBarChart
              barData={(!loading && stackedChartData) || {}}
              barSpacing={4}
            />
          </div>
        </div>
      </Module>
    )
  }
}

export default EngagementByProperty
