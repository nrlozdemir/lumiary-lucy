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

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectDate } = this.state
    const { data } = this.props
    return (
      <div className="grid-collapse">
        <div className={similarPropertiesContainer}>
          <div className={headerClass}>
            <div className="col-4 text-bold">
              <p className={headerTitleClass}>
                Top Similar Properties Of Top Videos
              </p>
            </div>
            <div className="col-8">
              <div className={style.selects}>
                <SelectFilters
                  selectClasses={selectClasses}
                  handleSelectFilters={this.handleSelectFilters}
                  selectDate={selectDate}
                  selectDateShow={true}
                />
              </div>
              <div className="clearFix" />
            </div>
          </div>
          <div className="col-12">
            {data.map((sectionItem, i) => (
              <TopSimilarPropertiesItem
                key={i}
                sectionItem={sectionItem}
                i={i}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
