import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import DoughnutCard from 'Components/DoughnutCard'
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
  const { data, title, filters, action, moduleKey, isLoading, isError } = props
    
  return (
    <Module
      title={title}
      filters={filters}
      moduleKey={moduleKey}
      action={action}
      isEmpty={!isLoading && isError}
    >
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={style.container}>
            {isLoading ? (
              <RouterLoading />
            ) : (
              <MultipleNoDataModule>
                {!!data && !!data.length
                  ? data.map((sectionItem, i) => {
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
                          <DoughnutCard
                            data={sectionItem.doughnutChartValues}
                            key={i}
                            index={i}
                            colors={colors}
                            isEmpty={isEmpty}
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
