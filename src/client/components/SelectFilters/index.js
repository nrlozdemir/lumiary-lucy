import React, { Component } from 'react'
import {
  SelectResolutionShow,
  SelectDurationShow,
  SelectWarmColorShow,
  SelectLikesShow,
  SelectPlatformsShow,
  SelectPercentShow,
  SelectViewsShow,
  SelectDateShow,
} from './components'

class SelectFilters extends Component {
  handleChange = (selectedOption, name) => {
    const { onChange = () => {}, handleSelectFilters = () => {} } = this.props
    onChange(name, selectedOption)
    handleSelectFilters(name, selectedOption)
  }

  render() {
    const nestedProps = {
      handleChange: this.handleChange,
      ...this.props,
    }
    console.log('nestedProps: ', nestedProps)

    return (
      <React.Fragment>
        <SelectResolutionShow {...nestedProps} />
        <SelectDurationShow {...nestedProps} />
        <SelectWarmColorShow {...nestedProps} />
        <SelectLikesShow {...nestedProps} />
        <SelectPlatformsShow {...nestedProps} />
        <SelectPercentShow {...nestedProps} />
        <SelectViewsShow {...nestedProps} />
        <SelectDateShow {...nestedProps} />
      </React.Fragment>
    )
  }
}

export default SelectFilters
