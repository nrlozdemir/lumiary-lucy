import React from 'react'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import Info from './Info'
import DoughnutCard from './DoughnutCard'
import {
  makeSelectInfoShowSection,
  makeSelectDoughnutData,
} from 'Reducers/libraryDetail'

class LibraryDetailDoughnutChart extends React.Component {
  render() {
    const { doughnutData, showInfo } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className="grid-container col-12 mt-48"
            style={{
              backgroundColor: colors.moduleBackground,
              boxShadow: `0px 2px 6px 0px ${colors.moduleShadow}`,
              color: colors.textColor,
            }}
          >
            <div className={style.radialChartsContainer}>
              {!showInfo &&
                doughnutData &&
                doughnutData.map(
                  (
                    {
                      key,
                      title,
                      doughnutChartValues,
                      max: { label, percentage },
                      data,
                    },
                    i
                  ) => (
                    <DoughnutCard
                      key={i}
                      identifier={key}
                      title={title}
                      chartData={doughnutChartValues}
                      maxLabel={label}
                      maxPercentage={percentage}
                      data={data}
                    />
                  )
                )}
              {showInfo && <Info />}
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  showInfo: makeSelectInfoShowSection(),
  doughnutData: makeSelectDoughnutData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  reduxForm({
    form: 'libraryDetailDoughnutChart',
  }),
  withConnect
)(LibraryDetailDoughnutChart)
