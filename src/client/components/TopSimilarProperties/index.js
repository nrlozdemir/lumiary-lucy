import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Select from 'Components/Form/Select'
import ProgressBar from 'Components/ProgressBar'

import style from './style.scss'

const similarPropertiesContainer = cx(
  'd-flex flex-column shadow-1 mb-72 pt-48 pb-48',
  style.similarPropertiesContainer
)
const headerClass = cx('col-12 mb-48', style.header)
const headerTitleClass = cx('font-secondary-first text-bold', style.title)
const selectClasses = cx('custom-select', style.selectStyles)
const sectionTitleClass = cx('font-primary', style.sectionTitle)
const sectionBadgeStyle = cx('font-secondary-second', style.sectionBadge)

class TopSimilarProperties extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption })
  }

  render() {
    const { time } = this.state
    const { data } = this.props
    return (
      <div className={similarPropertiesContainer}>
        <div className={headerClass}>
          <div className="col-4 text-bold">
            <p className={headerTitleClass}>
              Top Similar Properties Of Top Videos
            </p>
          </div>
          <div className="col-8">
            <div className={style.selects}>
              <Select
                name="date"
                customClass={selectClasses}
                placeholder="Time"
                value={time || ''}
                onChange={(option) => this.handleChange(option, 'time')}
                options={[
                  { value: 'Past Month', label: 'Past Month' },
                  { value: 'Past Year', label: 'Past Year' },
                ]}
              />
            </div>
            <div className="clearFix" />
          </div>
        </div>
        <div className="col-12">
          {data.map((sectionItem, i) => (
            <div key={i} className="col-4">
              <div
                className={cx('text-center', style.section, {
                  [style.no_border]: i === 0,
                })}
              >
                <p className={sectionTitleClass}>{sectionItem.title}</p>
                <p className={sectionBadgeStyle}>
                  <span>{sectionItem.description}</span>
                </p>
                {sectionItem.data.map((progressItem, index) => (
                  <div key={index} className={style.progressBarArea}>
                    <p className={style.progressText}>
                      <span className={style.leftTitle}>
                        {progressItem.leftTitle}
                      </span>
                      <span className={style.rightTitle}>
                        {progressItem.value}%
                      </span>
                    </p>
                    <ProgressBar
                      width={progressItem.value}
                      customBarClass={style.progressBar}
                      customPercentageClass={style.percentageBlue}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
