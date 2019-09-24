import React from 'react'
import {
  customChartOptions,
  referencesData,
  createTitle,
  chartTickOptions,
  createChartData,
} from './utils'
import BarChartModule from 'Components/Modules/BarChartModule'
import style from '../../../style.scss'

export const ModuleComponent = ({ props, state, callback }) => {
  const { topProperty } = state
  const {
    title,
    filters,
    moduleKey,
    container,
    themeContext: { colors },
    topPerformingPropertiesByCompetitorsData: {
      data: compTopData,
      loading: compTopLoading,
    },
    topPerformingPropertiesData: { data: topData, loading: topLoading },
  } = props

  const chartData = createChartData(
    container === 'competitor' ? compTopData : topData
  )

  return (
    <BarChartModule
      moduleKey={moduleKey}
      title={createTitle(title, topProperty, container)}
      containerClass={
        container === 'competitor' && style.detailTopPerformingPropertyContainer
      }
      barData={compTopLoading || topLoading ? {} : chartData}
      tickOptions={chartTickOptions()}
      customChartOptions={customChartOptions(colors)}
      height={50}
      action={callback}
      filters={filters}
      references={compTopLoading || topLoading ? [] : referencesData(chartData)}
      loading={compTopLoading || topLoading}
    />
  )
}
