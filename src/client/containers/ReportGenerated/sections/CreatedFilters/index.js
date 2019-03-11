import React from 'react'
import style from './style.scss'

const filters = [
  {
    name: 'Brand',
    filteredName: 'Scout Media',
  },
  {
    name: 'Platform',
    filteredName: 'All Platforms',
  },
  {
    name: 'Engagement',
    filteredName: 'Likes',
  },
  {
    name: 'Date Range',
    filteredName: 'Past Month',
  },
]

const CreatedFilters = () => {
  return (
    <div className={style.filtersArea}>
      {filters.map((item, index) => {
        return (
          <div className={style.filtersAreaItem}>
            <p>{item.name}</p>
            <span>{item.filteredName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default CreatedFilters
