import React from 'react'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const ReportsCards = ({ openModal, reportCardsData }) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return (
          <div className={style.reportsCardContainer}>
            {reportCardsData.map((card, index) => (
              <div
                className={style.reportsCard}
                style={{
                  background: colors.moduleBackground,
                  color: colors.textColor,
                  boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                  borderColor: colors.moduleBorder,
                }}
                onClick={() => openModal(card)}
                key={`reportsCard-${index}`}
              >
                <p className={style.cardTitle}>{card.title}</p>
                <div className={style.cardIcons}>
                  <img src={card.icon} alt={card.key} />
                </div>
                <p className={style.cardDescription}>{card.text}</p>
              </div>
            ))}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default ReportsCards
