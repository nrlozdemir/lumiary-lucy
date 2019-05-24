import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import DoughnutCard from 'Components/DoughnutCard'
import { ThemeContext } from 'ThemeContext/themeContext'
import classnames from 'classnames'
import style from './style.scss'
const TopSimilarProperties = (props) => {
  const { data, title, filters, action, moduleKey } = props
  return (
    <Module
      title={title}
      filters={filters}
      moduleKey={moduleKey}
      action={action}
    >
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className={classnames('col-12-no-gutters', style.container)}>
            {data &&
              data.map((sectionItem, i) => (
                <div className="col-4-no-gutters">
                  <div style={{ borderColor: colors.moduleBorder }}>
                    <DoughnutCard data={sectionItem} key={i} colors={colors} />
                  </div>
                </div>
              ))}
          </div>
        )}
      </ThemeContext.Consumer>
    </Module>
  )
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
