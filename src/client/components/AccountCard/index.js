import React from 'react'
import styles from './style.scss'
import cx from 'classnames'

const AccountCard = ({ status, children }) => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.card}>
          {status && (
            <div className={cx(styles.message, styles[status.state])}>
              {status.message}
            </div>
          )}
          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountCard
