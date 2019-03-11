import React, { Component } from 'react'
import moment from 'moment'
import Select from 'Components/Form/Select'
import Datepicker from 'Components/Datepicker'

class SelectFilters extends Component {
  handleChange = (selectedOption, name) => {
    this.props.onChange && this.props.onChange(name, selectedOption)
    this.props.handleSelectFilters(name, selectedOption)
  }

  render() {
    const {
      handleSelectFilters,
      selectClasses,
      selectViewsShow,
      selectDateShow,
      selectPercentShow,
      selectResolutionShow,
      selectLikesShow,
      selectPlatformsShow,
      selectWarmColorShow,
      selectDurationShow,

      // States for input values
      selectViews,
      selectDate,
      selectPercent,
      selectResolution,
      selectLikes,
      selectPlatforms,
      selectWarmColor,
      selectDuration,
    } = this.props

    return (
      <React.Fragment>
        {selectResolutionShow && (
          <Select
            name="selectResolution"
            customClass={selectClasses || 'custom-select'}
            placeholder="Resolution"
            value={selectResolution || ''}
            onChange={(option) => this.handleChange(option, 'selectResolution')}
            options={[
              { value: 'resolution', label: 'Resolution' },
              { value: 'aspect-ratio', label: 'Aspect Ratio' },
              { value: 'frame-rate', label: 'Frame Rate' },
              { value: 'duration', label: 'Duration' },
              { value: 'pacing', label: 'Pacing' },
              { value: 'dominant-color', label: 'Dominant Color' },
            ]}
          />
        )}
        {selectDurationShow && (
          <Select
            name="selectDuration"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Duration"
            value={selectDuration || ''}
            onChange={(option) => this.handleChange(option, 'selectDuration')}
            options={[
              { value: '0-15', label: '0-15 sec' },
              { value: '16-30', label: '16-30 sec' },
              { value: '31-60', label: '31-60 sec' },
              { value: '61', label: '61+' },
            ]}
          />
        )}
        {selectWarmColorShow && (
          <Select
            name="selectWarmColor"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select One"
            value={selectWarmColor || ''}
            onChange={(option) => this.handleChange(option, 'selectWarmColor')}
            options={[
              { value: 'happy-sad', label: 'Happy / Sad' },
              { value: 'energetic-calm', label: 'Energetic / Calm' },
              { value: 'saynthetic-natural', label: 'Saynthetic / Natural' },
            ]}
          />
        )}
        {selectLikesShow && (
          <Select
            name="selectLikes"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Views"
            value={selectLikes || ''}
            onChange={(option) => this.handleChange(option, 'selectLikes')}
            options={[
              { value: 'Views', label: 'Views' },
              { value: 'Likes', label: 'Likes' },
              { value: 'Shares', label: 'Shares' },
              { value: 'Comments', label: 'Comments' },
            ]}
          />
        )}
        {selectPlatformsShow && (
          <Select
            name="selectPlatforms"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Platforms"
            value={selectPlatforms || ''}
            onChange={(option) => this.handleChange(option, 'selectPlatforms')}
            options={[
              { value: 'All Platforms', label: 'All Platforms' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'twitter', label: 'Twitter' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'pinterest', label: 'Pinterest' },
            ]}
          />
        )}
        {selectPercentShow && (
          <Select
            name="selectPercent"
            customClass={selectClasses || 'custom-select'}
            placeholder="Resolution"
            value={selectPercent || ''}
            onChange={(option) => this.handleChange(option, 'selectPercent')}
            options={[
              { value: '360', label: '360' },
              { value: '480', label: '480' },
              { value: '720p', label: '720p' },
              { value: '1080p', label: '1080p' },
            ]}
          />
        )}
        {selectViewsShow && (
          <Select
            name="selectViews"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Views"
            value={selectViews || ''}
            onChange={(option) => this.handleChange(option, 'selectViews')}
            options={[
              { value: 'Card', label: 'Card' },
              { value: 'Table', label: 'Table' },
            ]}
          />
        )}
        {selectDateShow && (
          <React.Fragment>
            <Select
              name="selectDate"
              customClass={selectClasses || 'custom-select'}
              placeholder="Select Date"
              value={selectDate || ''}
              onChange={(option) => this.handleChange(option, 'selectDate')}
              options={[
                { value: 'Today', label: 'Today' },
                { value: 'Past Week', label: 'Past Week' },
                { value: 'Past Month', label: 'Past Month' },
                { value: 'Past 3 Months', label: 'Past 3 Months' },
                { value: 'custom', label: 'Custom' },
              ]}
            />
            {selectDate && selectDate.value === 'custom' && (
              <Datepicker
                type={'range'}
                apply={(value) => {
                  const val = {
                    value: {
                      startDate: value.startDate,
                      endDate: value.endDate,
                    },
                    label:
                      moment(value.startDate).format('DD/MM/YYYY') +
                      ' - ' +
                      moment(value.endDate).format('DD/MM/YYYY'),
                  }
                  this.props.onChange && this.props.onChange('selectDate', val)
                  handleSelectFilters('selectDate', val)
                }}
                back={() => handleSelectFilters('selectDate', null)}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default SelectFilters
