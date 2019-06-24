import React from 'react'

import { ThemeContext } from 'ThemeContext/themeContext'
import style from '../style.scss'

import LibraryData from './LibraryData'
import BasedOnShares from './BasedOnShares'
import IndustryData from './IndustryData'
import Header from './Header'
import LineChart from './LineChart'

const moduleKey = 'LDDH'

const Info = ({ videoId, title, loading, ...rest }) => (
  <ThemeContext.Consumer>
    {({ themeContext: { colors } }) => (
      <div className={style.radialChartsContainer}>
        <div
          className={style.doughnutPanelTab}
          style={{
            background: colors.moduleBackground,
          }}
        >
          <Header
            videoId={videoId}
            title={title}
            moduleKey={moduleKey}
            {...rest}
          />
          {!loading ? (
            <React.Fragment>
              <div
                className={style.dataWrapper}
                style={{
                  background: colors.moduleBackground,
                }}
              >
                <LibraryData />
                <BasedOnShares title={title} moduleKey={moduleKey} {...rest} />
                <IndustryData />
              </div>
              <LineChart />
            </React.Fragment>
          ) : (
            <div className={style.infoLoading}>loading...</div>
          )}
        </div>
      </div>
    )}
  </ThemeContext.Consumer>
)

export default Info
