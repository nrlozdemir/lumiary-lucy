import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import cx from 'classnames'

import styles from './styles.scss'

const Breadcrumbs = ({ items, className }) => {
  const getItem = (item) => (<Link to={item.link}>{item.name}</Link>)
  const lastItemIndex = items.length - 1;

  return (
    <div className={cx(styles.breadcrumbs, className)}>
      <ul>
        { items && items.map((item, index) => (
          <li key={item.name}>
            { lastItemIndex !== index ? (
              getItem(item)
            ) : <span> {item.name} </span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.array,
};

export default Breadcrumbs
