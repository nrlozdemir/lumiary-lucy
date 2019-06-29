import React from 'react'
import style from './style.scss'

const MultipleNoDataModule = ({ children }) => {
  return (
    <div className={style.noDataContainer}>
      {!!children && children.map((child, index) => {
        return (
          <div className={style.noDataContainerBody} key={`nodata_${index}`}>
            <div
              className={
                child.props.datasetsIsEmpty ? style.noDataOpacity : undefined
              }
            >
              {child}
            </div>
            {child.props.datasetsIsEmpty && (
              <div className={style.noDataText}>
                {child.props.datasetsText || 'No Data Available'}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MultipleNoDataModule
