import React from 'react'
import styles from './style.scss'

const AccountCard = ({ children }) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.card}>{children}</div>
      </div>
    </React.Fragment>
  )
}

export default AccountCard
