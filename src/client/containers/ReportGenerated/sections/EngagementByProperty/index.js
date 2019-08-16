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
  shouldComponentUpdate(nextProps) {
    const {
      data: { data, loading },
    } = this.props
    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    return (
      (data && !isEqual(JSON.stringify(data), JSON.stringify(nextData))) ||
      loading !== nextLoading
    )
  }

  callBack = (data) => {
    const { action, report } = this.props
    action({ ...data, report })
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
              width={278}
              height={278}
              data={!loading ? doughnutData : {}}
              cutoutPercentage={58}
              fillText={isDoughnutEmpty ? 'No Data' : 'Total Percentage'}
              dataLabelFunction="insertAfter"
              dataLabelInsert="%"
              labelPositionRight
              datasetsBorderWidth={0}
              slicePiecesWidth={0.4}
              datasetOptions={{
                shadowOffsetX: 0.5,
                shadowOffsetY: 0.5,
                shadowBlur: 4,
              }}
              layoutPadding={8}
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
