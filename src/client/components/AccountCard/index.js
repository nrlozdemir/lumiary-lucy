import React from 'react'
import styles from './style.scss'
import cx from 'classnames'
import RouterLoading from 'Components/RouterLoading'

const AccountCard = ({ status, loading, colors, children }) => {
  return (
    <React.Fragment>
      <div className={cx(styles.container, { [styles.loading]: loading })}>
        <div className={styles.card} style={colors.account.card || {}}>
          {status && (
            <div className={cx(styles.message, styles[status.state])}>
              {status.message}
            </div>
          )}
          {children}
          {loading && (
            <div className={styles.cardLoading}>
              <RouterLoading />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountCard
