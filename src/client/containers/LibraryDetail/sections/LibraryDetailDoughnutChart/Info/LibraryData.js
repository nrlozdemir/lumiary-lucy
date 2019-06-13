import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import {
  makeSelectInfoShowSection,
  makeSelectInfoIndustryData,
} from 'Reducers/libraryDetail'

class LibraryData extends React.Component {
  render() {
		console.log(this.props);
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <h1 className={style.panelHeader}>Library Data</h1>
            <div className={style.doughnutChartContainer}>
              <DoughnutChart
                width={180}
                height={180}
                displayDataLabels={false}
                cutoutPercentage={50}
                data={{
                  labels: ['Red', 'Green', 'Blue', 'Yellow'],
                  datasets: [
                    {
                      data: [9.87, 30.04, 18.83, 41.26],
                      borderColor: '#373F5B',
                      backgroundColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#2FD7C4',
                      ],
                      hoverBackgroundColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#2FD7C4',
                      ],
                    },
                  ],
                }}
              />
              <p className="pt-32">
                <span className={style.duskRound} />
                <span className={style.textBold}>52%</span>
                of your library is shot in
                <span className={style.textBold}>24fps</span>
              </p>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  sectionData: makeSelectInfoShowSection(),
  industryData: makeSelectInfoIndustryData(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(LibraryData)

