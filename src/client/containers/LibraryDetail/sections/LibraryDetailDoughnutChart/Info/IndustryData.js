import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { makeSelectInfoModalData } from 'Reducers/libraryDetail'

class IndustryData extends React.Component {
  render() {
    const { modalData } = this.props
    
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
                  width={180}
                  height={180}
                  displayDataLabels={false}
                  cutoutPercentage={50}
                  data={modalData.industryChartData}
                />
                <p className="w-75 text-center pt-32">
                  <span className={style.purpleRound} />
                  <span className={style.textBold}>
                    {modalData.industryMaxValue}%{' '}
                  </span>
                  of your library is shot in
                  <span className={style.textBold}>
                    {' '}
                    {modalData.industryMaxKey}
                  </span>
                </p>
              </div>
            ) : (
              <div className={style.emptyData}>No Data Available</div>
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
