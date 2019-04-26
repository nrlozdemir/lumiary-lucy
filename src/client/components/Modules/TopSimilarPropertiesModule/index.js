import React from 'react'
import PropTypes from 'prop-types'
import TopSimilarPropertiesItem from 'Components/TopSimilarPropertiesItem'
import style from './style.scss'
import Module from 'Components/Module'

const TopSimilarProperties = (props) => {
  const { data, title, filters, action, moduleKey } = props

  return (
    <Module
      title={title}
      filters={filters}
      moduleKey={moduleKey}
      action={action}
    >
      <div className="col-12-no-gutter">
        {data &&
          data.map((sectionItem, i) => (
            <TopSimilarPropertiesItem key={i} sectionItem={sectionItem} i={i} />
          ))}
      </div>
    </Module>
  )
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
