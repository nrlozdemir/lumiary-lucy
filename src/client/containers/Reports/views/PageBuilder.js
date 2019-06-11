import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import {
  actions as reportsActions,
  makeSelectReportsPredefinedReportValues,
} from 'Reducers/reports'
import RouterLoading from 'Components/RouterLoading'
import { orderBy } from 'lodash'

// MODULE IMPORTS
import ContentVitalityScore from '../section/ContentVitalityScore'
import VideoComparison from '../section/VideoComparison'
import PerformanceComparison from '../section/PerformanceComparison'
import ColorComparison from '../section/ColorComparison'
import ReportCards from '../section/ReportCardsModule'
import {
  SliderModule,
  BarChartModule,
  PacingCardModule,
  RadarChartModule,
  ReportCardsModule,
  TopVideosCardModule,
  ColorTemperatureModule,
  BarAndDoughnutChartModule,
  LineAndDoughnutChartModule,
  TopSimilarPropertiesModule,
  VideoReleasesBarChartModule,
} from 'Components/Modules'

const modules = {
  SliderModule,
  BarChartModule,
  PacingCardModule,
  RadarChartModule,
  TopVideosCardModule,
  ColorTemperatureModule,
  BarAndDoughnutChartModule,
  LineAndDoughnutChartModule,
  TopSimilarPropertiesModule,
  VideoReleasesBarChartModule,
  ReportCardsModule: ReportCards,
  VideoComparisonModule: VideoComparison,
  ColorComparisonModule: ColorComparison,
  ContentVitalityScoreModule: ContentVitalityScore,
  PerformanceComparisonModule: PerformanceComparison,
}

class PageBuilder extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props

    const { predefinedReportRequest } = this.props

    const id = params && params.id

    if (id) {
      predefinedReportRequest(id)
    }
  }

  render() {
    const {
      getPredefinedReportChartData,
      predefinedReportValues: { data: reportModules, loading, chartData },
    } = this.props

    if (loading) {
      return <RouterLoading />
    }

    if (!loading && !reportModules) {
      return <div>Empty Report</div>
    }

    const sortedModules = orderBy(reportModules, [
      'predefined_report_modules.order',
      'ASC',
    ])

    console.log('predefined report modules =', sortedModules)

    return (
      <div>
        {/**** To test all modules
        {Object.keys(modules).map((moduleKey, idx) => {
          else
        {sortedModules.map((module, idx) => {
          const moduleKey =
          !!module &&
          !!module.predefined_report_modules &&
          module.predefined_report_modules.module
        ******/}
        {sortedModules.map((module, idx) => {
          const moduleKey =
            !!module &&
            !!module.predefined_report_modules &&
            module.predefined_report_modules.module

          const ModuleToRender = (!!moduleKey && modules[moduleKey]) || null

          console.log(ModuleToRender)

          const moduleData = {
            error: false,
            data: chartData[moduleKey],
            loading: !chartData[moduleKey],
          }

          return !!ModuleToRender ? (
            <div key={`module_${idx}`}>
              <ModuleToRender
                moduleKey={`Reports/${moduleKey}`}
                action={getPredefinedReportChartData}
                data={moduleData}
              />
            </div>
          ) : null
        })}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  predefinedReportValues: makeSelectReportsPredefinedReportValues(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...reportsActions }, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(PageBuilder)
