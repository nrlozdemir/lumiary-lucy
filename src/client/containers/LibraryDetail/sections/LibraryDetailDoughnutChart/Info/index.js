import React from 'react'

import { ThemeContext } from 'ThemeContext/themeContext'
import style from '../style.scss'

import LibraryData from './LibraryData'
import BasedOnShares from './BasedOnShares'
import IndustryData from './IndustryData'
import Header from './Header'
import LineChart from './LineChart'
import RouterLoading from 'Components/RouterLoading'
import cx from 'classnames'

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
          <React.Fragment>
            <div
              className={cx(style.dataWrapper, {
                [style.chartLoading]: loading,
              })}
              style={{
                background: colors.moduleBackground,
              }}
            >
              <LibraryData loading={loading} />
              <BasedOnShares
                loading={loading}
                title={title}
                moduleKey={moduleKey}
                {...rest}
              />
              <IndustryData loading={loading} />
            </div>
            <h4 class={style.pageTitle}>
              Library vs Industry Property Comparison
            </h4>
            <LineChart />
          </React.Fragment>
          {loading && (
            <div className={style.infoLoading}>
              <RouterLoading />
            </div>
          )}
        </div>
      </div>
    )}
  </ThemeContext.Consumer>
)

export default Info
