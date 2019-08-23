import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import DownArrowCircle from 'Components/Icons/DownArrowCircle'
import { actions } from 'Reducers/libraryDetail'
import { doughnutChartDataWithOpacity, getPropLabel } from 'Utils'
import { isDataSetEmpty } from 'Utils/datasets'
import cx from 'classnames'

class DoughnutCard extends React.Component {
  render() {
    const {
      identifier,
      title,
      maxLabel,
      duration,
      maxPercentage,
      toggleInfoSection,
      chartData,
      videoId,
      colors,
      showAllData = false
    } = this.props

    const newChartData = doughnutChartDataWithOpacity(chartData, colors)

    const isEmpty = isDataSetEmpty(chartData)

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.radialChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <div
              className={style.doughnutChartContainerHover}
              style={{
                backgroundColor: colors.moduleBackground,
                boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
                color: colors.textColor,
              }}
            />
            <div className={style.cardInner}>
              <h1 className={style.cardTitle}>{title}</h1>
              <div
                className={cx(style.subtitle, {
                  [style.dark]: colors.themeType === 'dark',
                  [style.light]: colors.themeType === 'light',
                })}
              >
                {!!duration && duration !== '00:00:00' ? duration : maxLabel}
              </div>
              <div className={style.doughnutChartContainer}>
                <DoughnutChart
                  showAllData={showAllData}
                  width={132}
                  height={132}
                  layoutPadding={8}
                  displayDataLabels={false}
                  cutoutPercentage={60}
                  data={newChartData}
                  datasetsBorderColor={colors.moduleBackground}
                  datasetsHoverBorderColor={colors.moduleBackground}
                  datasetsBorderWidth={0}
                  tooltipMode="nearest"
                  slicePiecesWidth={0.4}
                  datasetOptions={{
                    shadowOffsetX: 2,
                    shadowOffsetY: 1.5,
                    shadowBlur: 4,
                    hoverShadowBlur: 4,
                  }}
                />
                {isEmpty && (
                  <div className={cx(style.textBold, style.emptyDoughnut)}>
                    No Data Available
                  </div>
                )}
                <p>
                  <span className={style.textBold}>{maxPercentage}% </span>
                  of your library
                  <br /> is shot in
                  <span className={style.textBold}>
                    {' '}
                    {getPropLabel(maxLabel, identifier)}
                  </span>
                </p>
              </div>
            </div>
            <a
              className={style.doughnutChartFooter}
              onClick={() =>
                toggleInfoSection({
                  title,
                  label: maxLabel,
                })
              }
              style={{
                backgroundColor: colors.modalButtonBackground,
                color: colors.textColor,
              }}
            >
              View Metrics
              <DownArrowCircle className={style.icon} size={24} />
            </a>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps(dispatch) {
  return {
    toggleInfoSection: (show) => dispatch(actions.toggleInfoSection(show)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(DoughnutCard)
