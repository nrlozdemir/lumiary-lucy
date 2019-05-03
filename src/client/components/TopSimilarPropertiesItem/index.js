import React from 'react'
import cx from 'classnames'
import ProgressBar from 'Components/ProgressBar'
import style from './style.scss'

const sectionTitleClass = cx('font-primary', style.sectionTitle)
const sectionBadgeStyle = cx('font-secondary-second', style.sectionBadge)

const TopSimilarPropertiesItem = ({ sectionItem, i }) => {
  return (
    <div className="col-4">
      <div className={cx('text-center', style.section, { [style.no_border]: i === 0 })}>
        <p className={sectionTitleClass}>{sectionItem.title}</p>
        <p className={sectionBadgeStyle}><span>{sectionItem.description}</span></p>
        {sectionItem.data.map((progressItem, index) => (
          <div key={index} className={style.progressBarArea}>
            <p className={style.progressText}>
              <span className={style.leftTitle}>{progressItem.leftTitle}</span>
              <span className={style.rightTitle}>{progressItem.value}%</span>
            </p>
            <ProgressBar
              width={progressItem.value}
              customBarClass={style.progressBar}
              customPercentageClass={style.percentageBlue}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopSimilarPropertiesItem
