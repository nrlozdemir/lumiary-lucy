import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import ProgressBarCard from 'Components/ProgressBarCard'
import { ThemeContext } from 'ThemeContext/themeContext'
import classnames from 'classnames'
import style from './style.scss'
import { isDataSetEmpty } from 'Utils/datasets'
import MultipleNoDataModule from 'Components/MultipleNoDataModule'
import RouterLoading from 'Components/RouterLoading'

const WrapperModule = ({ children, style, className }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

const TopSimilarProperties = (props) => {
  const { data = {}, title, action, moduleKey, isLoading, isError, filters } = props

  const allDataPresent = Object.keys(data).reduce((accumulator, key) => {
    if(Object.keys(data[key]).length === 0) {
      accumulator = false
    }

    return accumulator
  }, true)

  return (
    <Module
      title={title}
      filters={filters}
      moduleKey={moduleKey}
      action={action}
      isEmpty={(!isLoading && !!isError) || false}
    >
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.container}>
            {isLoading 
            ? (
              <RouterLoading />
            ) 
            : (!allDataPresent) 
            ? (
              <div className={style.empty}>No Data Available</div>
            )
            : (
              <MultipleNoDataModule>
                {!!data && !!Object.keys(data).length && allDataPresent
                  ? Object.keys(data).map((sectionItem, i) => {
                      const moduleContainer = classnames({
                        [style.similarContainer]: i !== 0,
                      })
                      const isEmpty =
                        !!data &&
                        !!data.length &&
                        data
                          .map((value) =>
                            isDataSetEmpty(value.doughnutChartValues)
                          )
                          .every((dataset) => dataset === true)

                      return (
                        <WrapperModule
                          className={moduleContainer}
                          style={{ borderColor: colors.moduleBorder }}
                          key={`TopSimilarProperties_${i}`}
                          datasetsIsEmpty={isEmpty}
                        >
                          <ProgressBarCard 
                            titleSlug={sectionItem}
                            items={data[sectionItem]}
                          />
                        </WrapperModule>
                      )
                    })
                  : null}
              </MultipleNoDataModule>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    </Module>
  )
}

TopSimilarProperties.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

export default TopSimilarProperties
