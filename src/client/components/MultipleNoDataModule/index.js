import React from 'react'
import cx from 'classnames'
import style from './style.scss'

const MultipleNoDataModule = ({
  children,
  disabledNoContainerBody = false,
}) => {
  return (
    <div
      className={cx(style.noDataContainer, {
        [style.customize]: !!disabledNoContainerBody,
      })}
    >
      {!!children &&
        children.map((child, index) => {
          const childStyle = (!!child.props.style && child.props.style) || {}
          return (
            <div
              className={cx(style.noDataContainerBody, {
                [style.customize]: !!disabledNoContainerBody,
              })}
              style={childStyle}
              key={`nodata_${index}`}
            >
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
