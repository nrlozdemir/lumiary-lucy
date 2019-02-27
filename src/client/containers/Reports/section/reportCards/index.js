import React from 'react'
import style from './style.scss'

const ReportsCards = () => {
  return (
    <div className={style.reportsCardContainer}>
      <div className={style.reportsCard}>
        <p className={style.cardTitle}>Brand Insights</p>
        <div className={style.cardIcons}>
          <img
            src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/brand-insights-icon.svg"
            alt="brand-insights"
          />
        </div>
        <p className={style.cardDescription}>
          Get helpful, detailed engagement metrics about competitor brands
        </p>
      </div>
      <div className={style.reportsCard}>
        <p className={style.cardTitle}>Compare Brands</p>
        <div className={style.cardIcons}>
          <img
            src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/compare-brands-icon.svg"
            alt="compare-brands"
          />
        </div>
        <p className={style.cardDescription}>
          Compare two brands to learn what’s driving their performance
        </p>
      </div>
      <div className={style.reportsCard}>
        <p className={style.cardTitle}>Properties</p>
        <div className={style.cardIcons}>
          <img
            src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/properties-icon.svg"
            alt="properties"
          />
        </div>
        <p className={style.cardDescription}>
          View detailed, comparative data of video attributes across brands
        </p>
      </div>
      <div className={style.reportsCard}>
        <p className={style.cardTitle}>Predefined Reports</p>
        <div className={style.cardIcons}>
          <img
            src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/predefined-reports-icon.svg"
            alt="predefined-reports"
          />
        </div>
        <p className={style.cardDescription}>
          Access unique, relevant and invaluable customized data
        </p>
      </div>
    </div>
  )
}

export default ReportsCards
