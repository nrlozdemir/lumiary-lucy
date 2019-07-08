import React from 'react'
import classnames from 'classnames'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const ReportsCards = ({ openModal, reportCardsData }) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => {
        return (
          <div className={style.reportsCardContainer}>
            <style>
              {`
                .${style.reportsCardContainer} .${style.reportsCard}:hover {
                  background: ${colors.moduleBackgroundHover} !important
                }
              `}
            </style>
            {!!reportCardsData &&
              reportCardsData.map((card, index) => {
                const disabled = card.key === 'predefined-reports'
                const cardContainerStyle = classnames(style.reportsCard, {
                  [style.disabled]: disabled,
                })
                return (
                  <div
                    className={cardContainerStyle}
                    style={{
                      background: colors.moduleBackground,
                      color: colors.textColor,
                      boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
                      borderColor: colors.moduleBorder,
                    }}
                    onClick={() => openModal(card)}
                    key={`reportsCard-${index}`}
                  >
                    {disabled && (
                      <span className={style.badge}>Coming soon!</span>
                    )}
                    {disabled && (
                      <div
                        className={style.opacityBg}
                        style={{ background: colors.moduleBackground }}
                      />
                    )}
                    <p className={style.cardTitle}>{card.title}</p>
                    <div className={style.cardIcons}>
                      <img
                        src={
                          colors.themeType === 'light'
                            ? card.iconLight || card.icon
                            : card.icon
                        }
                        alt={card.key}
                      />
                    </div>
                    <p className={style.cardDescription}>{card.text}</p>
                  </div>
                )
              })}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default ReportsCards
