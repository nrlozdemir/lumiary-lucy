import React from 'react'

import { ThemeContext } from 'ThemeContext/themeContext'
import style from '../style.scss'

import LibraryData from './LibraryData'
import BasedOnShares from './BasedOnShares'
import IndustryData from './IndustryData'
import Header from './Header'
import LineChart from './LineChart'

class Info extends React.Component {
  handleFilterChange = (filters) => {
    console.log(filters)
  }

  render() {
    const { selectedCardData } = this.props

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.radialChartsContainer}>
            <div
              className={style.doughnutPanelTab}
              style={{
                background: colors.moduleBackground,
              }}
            >
              <Header onFilterChange={this.handleFilterChange} />
              <div
                className={style.dataWrapper}
                style={{
                  background: colors.moduleBackground,
                }}
              >
                <LibraryData />
                <BasedOnShares />
                <IndustryData />
              </div>
              <LineChart selectedCardData={selectedCardData} />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Info
