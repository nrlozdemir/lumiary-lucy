import React from 'react'
import style from './style.scss'

const ReportsCards = ({ openModal, reportCards }) => {
  return (
    <div className={style.reportsCardContainer}>
      {reportCards.map((card) => (
        <div className={style.reportsCard} onClick={() => openModal(card)}>
          <p className={style.cardTitle}>{card.title}</p>
          <div className={style.cardIcons}>
            <img src={card.icon} alt={card.key} />
          </div>
          <p className={style.cardDescription}>{card.text}</p>
        </div>
      ))}
    </div>
  )
}

export default ReportsCards
