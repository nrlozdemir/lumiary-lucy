import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import {
  makeSelectInfoShowSection,
  makeSelectInfoModalData,
} from 'Reducers/libraryDetail'
import cx from 'classnames'

class LibraryData extends React.Component {
  render() {
    const { modalData, loading } = this.props
    
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <h1 className={style.panelHeader}>Library Data</h1>
            {modalData && modalData.libraryChartData ? (
              <div className={style.doughnutChartContainer}>
                <DoughnutChart
                  width={180}
                  height={180}
                  displayDataLabels={false}
                  cutoutPercentage={50}
                  data={modalData.libraryChartData}
                />
                <p className="pt-32">
                  <span className={style.duskRound} />
                  <span className={style.textBold}>
                    {modalData.libraryMaxValue}%{' '}
                  </span>
                  of your library is shot in
                  <span className={style.textBold}>
                    {' '}
                    {modalData.libraryMaxKey}
                  </span>
                </p>
              </div>
            ) : (
              <div className={cx(style.emptyData, {
                [style['emptyData--loading']]: loading
              })}>
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
  sectionData: makeSelectInfoShowSection(),
  modalData: makeSelectInfoModalData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryData)
