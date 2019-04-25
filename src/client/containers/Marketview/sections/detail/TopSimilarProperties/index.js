import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import SelectFilters from 'Components/SelectFilters'

import TopSimilarPropertiesItem from 'Components/TopSimilarPropertiesItem'
import style from './style.scss'

const similarPropertiesContainer = cx(
  'shadow-1 col-12-gutter-20 mb-48 pt-48 pb-48',
  style.similarPropertiesContainer
)
const headerClass = cx('col-12 mb-48', style.header)
const headerTitleClass = cx('font-secondary-first text-bold', style.title)
const selectClasses = cx('custom-select', style.selectStyles)

class TopSimilarProperties extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { selectDate } = this.state
    const { data } = this.props
    return (
      <Module
        moduleKey={'Panoptic/ColorTemperature'}
        title={title}
        filters={filters}
        legend={
          titleLabels && (
            <div
              className={classnames(
                style.colorListHorizontal,
                style.colorList,
                style.floatRight
              )}
            >
              {titleLabels.map((title, index) => (
                <div key={index} className={style.colorListItem}>
                  {title}
                </div>
              ))}
            </div>
          )
        }
      >
        <div className="col-12">
          {data.map((sectionItem, i) => (
            <TopSimilarPropertiesItem key={i} sectionItem={sectionItem} i={i} />
          ))}
        </div>
      </Module>
    )
  }
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
