/**
 *
 * ProgressBarCard
 *
 */

import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import ProgressBar from 'Components/ProgressBar'

const maxProgressBars = 4

const getTitleFromSlug = (slug) => {
  switch (slug) {
    case 'duration':
      return 'Duration'

    case 'pacing':
      return 'Pacing'

    case 'dominantColorShots':
      return 'Dominant Color'
  }
}

/* eslint-disable react/prefer-stateless-function */
const ProgressBarCard = (params = {}) => {
  const { titleSlug = '', items = {} } = params

  if (titleSlug === '' || Object.keys(items).length === 0) {
    return null
  }

  const title = getTitleFromSlug(titleSlug)
  const sortedItems = Object.keys(items)
    .sort((a, b) => {
      return items[b] - items[a]
    })
    .map((key) => {
      return {
        title: key,
        value: items[key],
      }
    })
    .slice(0, maxProgressBars)
  const topBucket = (sortedItems[0] && sortedItems[0].title) || ''

  if (!topBucket || sortedItems.length === 0) {
    return null
  }

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return (
          <div>
            <h3 className={style.cardTitle}>{title}</h3>
            <p className={style.sectionBadge}>
              <span style={{ backgroundColor: colors.duskBackground }}>
                {topBucket}
              </span>
            </p>
            <div>
              {sortedItems.map((item, idx) => {
                return (
                  <div className={style.progressItem} key={idx}>
                    <p className={style.progressText}>
                      <span className={style.leftTitle}>{item.title}</span>
                      <span className={style.rightTitle}>{item.value}%</span>
                    </p>
                    <ProgressBar
                      width={item.value}
                      customBarClass={cx(style.progressBar, {
                        [style[
                          `progressBar--${
                            colors.themeType === 'dark' ? 'dark' : 'light'
                          }`
                        ]]: true,
                      })}
                      customPercentageClass={cx(style.percentageBlue)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default ProgressBarCard
