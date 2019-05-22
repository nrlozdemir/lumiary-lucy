import React from 'react'
import cx from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import { capitalizeFirstLetter } from 'Utils'

const sectionTitleClass = cx('font-primary', style.sectionTitle)
const sectionBadgeStyle = cx('font-secondary-second', style.sectionBadge)

const TopSimilarPropertiesItem = ({ sectionItem, i }) => {
  const dataset = sectionItem.datasets[0]
  const topItemIndex = dataset.data.indexOf(Math.max(...dataset.data))

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <div className="col-4">
          <div
            className={cx('text-center', style.section, {
              [style.no_border]: i === 0,
            })}
            style={{
              color: colors.textColor,
            }}
          >
            <p className={sectionTitleClass}>{dataset.label}</p>

            <div className={style.chartSectionBadge}>
              <span
                style={{
                  background: colors.labelBackground,
                  color: colors.labelColor,
                  shadowColor: colors.labelShadow,
                }}
              >
                {sectionItem.labels[topItemIndex]
                  .split('-')
                  .map((c) => capitalizeFirstLetter(c))
                  .join('-')}
              </span>
            </div>
            {sectionItem.labels.map((title, index) => (
              <div key={index} className={style.progressBarArea}>
                <p className={style.progressText}>
                  <span className={style.leftTitle}>
                    {title
                      .split('-')
                      .map((c) => capitalizeFirstLetter(c))
                      .join('-')}
                  </span>
                  <span className={style.rightTitle}>
                    {dataset.data[index]}%
                  </span>
                </p>
                <ProgressBar
                  width={dataset.data[index]}
                  customBarClass={style.progressBar}
                  customPercentageClass={style.percentageBlue}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default TopSimilarPropertiesItem
