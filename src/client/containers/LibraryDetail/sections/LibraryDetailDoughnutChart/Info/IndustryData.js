import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { makeSelectInfoModalData } from 'Reducers/libraryDetail'
import { doughnutChartDataWithOpacity } from 'Utils'
import cx from 'classnames'

class IndustryData extends React.Component {
  render() {
    const { modalData, loading } = this.props
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <h1 className={style.panelHeader}>Industry Data</h1>
            {modalData && modalData.industryChartData ? (
              <div className={style.doughnutChartContainer}>
                <DoughnutChart
                  width={188}
                  height={188}
                  layoutPadding={8}
                  displayDataLabels={false}
                  cutoutPercentage={50}    
                  datasetsBorderWidth={0}
                  tooltipMode="nearest"
                  slicePiecesWidth={0.4}
                  datasetOptions={{
                    shadowOffsetX: 2,
                    shadowOffsetY: 1.5,
                    shadowBlur: 4,
                    hoverShadowBlur: 4,
                  }}
                  data={doughnutChartDataWithOpacity(
                    modalData.industryChartData,
                    colors,
                    '#8562f3'
                  )}
                />
                <p className="w-75 text-center pt-32">
                  <span className={style.purpleRound} />
                  <span className={style.textBold}>
                    {modalData.industryMaxValue}%{' '}
                  </span>
                  of the industry is shot in
                  <span className={style.textBold}>
                    {' '}
                    {modalData.industryMaxKey}
                  </span>
                </p>
              </div>
            ) : (
              <div
                className={cx(style.emptyData, {
                  [style['emptyData--loading']]: loading,
                })}
              >
                {!loading ? 'No Data Available' : ''}
              </div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  modalData: makeSelectInfoModalData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(IndustryData)
