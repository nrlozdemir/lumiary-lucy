import React from 'react'
import cx from 'classnames'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import { capitalizeFirstLetter } from 'Utils'

const sectionTitleClass = cx('font-primary', style.sectionTitle)

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
            <p className={sectionTitleClass}>
              #{i + 1} {dataset.label}
            </p>

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

            <div className={style.doughnutChartContainer}>
              <DoughnutChart
                width={150}
                height={150}
                displayDataLabels={false}
                cutoutPercentage={50}
                data={sectionItem}
              />
              <p>
                <span className={style.textBold}>
                  {dataset.data[topItemIndex]}%{' '}
                </span>
                52% of top videos of top videos
                <br /> are shot in{' '}
                <span className={style.textBold}>
                  {sectionItem.labels[topItemIndex]
                    .split('-')
                    .map((c) => capitalizeFirstLetter(c))
                    .join('-')}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default TopSimilarPropertiesItem
