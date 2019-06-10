import React, { Component } from 'react'
import Select from 'Components/Form/Select'

const LIKES_OPTIONS = [
	{ value: 'Views', label: 'Views' },
	{ value: 'Likes', label: 'Likes' },
	{ value: 'Shares', label: 'Shares' },
	{ value: 'Comments', label: 'Comments' },
];

const RESOLUTION_OPTIONS = [
	{ value: 'resolution', label: 'Resolution' },
	{ value: 'aspect-ratio', label: 'Aspect Ratio' },
	{ value: 'frame-rate', label: 'Frame Rate' },
	{ value: 'duration', label: 'Duration' },
	{ value: 'pacing', label: 'Pacing' },
	{ value: 'dominant-color', label: 'Dominant Color' },
];

const DURATION_OPTIONS = [
	{ value: '0-15', label: '0-15 sec' },
	{ value: '16-30', label: '16-30 sec' },
	{ value: '31-60', label: '31-60 sec' },
	{ value: '61', label: '61+' },
];

const WARM_COLOR_OPTIONS = [
	{ value: 'happy-sad', label: 'Happy / Sad' },
	{ value: 'energetic-calm', label: 'Energetic / Calm' },
	{ value: 'saynthetic-natural', label: 'Saynthetic / Natural' },
];

const PLATFORM_OPTIONS = [
	{ value: 'All Platforms', label: 'All Platforms' },
	{ value: 'facebook', label: 'Facebook' },
	{ value: 'twitter', label: 'Twitter' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'youtube', label: 'YouTube' },
];

const PERCENT_OPTIONS = [
	{ value: '360', label: '360' },
	{ value: '480', label: '480' },
	{ value: '720p', label: '720p' },
	{ value: '1080p', label: '1080p' },
];

const VIEW_OPTIONS = [
	{ value: 'Card', label: 'Card' },
	{ value: 'Table', label: 'Table' },
];

const DATE_OPTIONS = [
	{ value: 'Past Week', label: 'Past Week' },
	{ value: 'Past Month', label: 'Past Month' },
	{ value: 'Past 3 Months', label: 'Past 3 Months' },
];

class SelectFilters extends Component {
  handleChange = (selectedOption, name) => {
		const {onChange = () => {}, handleSelectFilters = () => {}} = this.props;
    onChange(name, selectedOption)
    handleSelectFilters(name, selectedOption)
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
			defaults: {
				resolution = 'resolution',
				duration = '0-15',
				warmColor = 'happy-sad',
				likes = 'Views',
				platforms = 'All Platforms',
				percent = '360',
				views = 'Card',
				date = 'Past Week'
			} = {}
    } = this.props

    return (
      <React.Fragment>
        {selectResolutionShow && (
          <Select
            name="selectResolution"
            customClass={selectClasses || 'custom-select'}
            placeholder="Resolution"
            value={selectResolution || RESOLUTION_OPTIONS.find(({value}) => value === resolution)}
            onChange={(option) => this.handleChange(option, 'selectResolution')}
            options={RESOLUTION_OPTIONS}
          />
        )}
        {selectDurationShow && (
          <Select
            name="selectDuration"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Duration"
            value={selectDuration || DURATION_OPTIONS.find(({value}) => value === duration)}
            onChange={(option) => this.handleChange(option, 'selectDuration')}
            options={DURATION_OPTIONS}
          />
        )}
        {selectWarmColorShow && (
          <Select
            name="selectWarmColor"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select One"
            value={selectWarmColor || WARM_COLOR_OPTIONS.find(({value}) => value === warmColor)}
            onChange={(option) => this.handleChange(option, 'selectWarmColor')}
            options={WARM_COLOR_OPTIONS}
          />
        )}
        {selectLikesShow && (
          <Select
            name="selectLikes"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Views"
            value={selectLikes || LIKES_OPTIONS.find(({value}) => value === likes)}
            onChange={(option) => this.handleChange(option, 'selectLikes')}
            options={LIKES_OPTIONS}
          />
        )}
        {selectPlatformsShow && (
          <Select
            name="selectPlatforms"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Platforms"
            value={selectPlatforms || PLATFORM_OPTIONS.find(({value}) => value === platforms)}
            onChange={(option) => this.handleChange(option, 'selectPlatforms')}
            options={PLATFORM_OPTIONS}
          />
        )}
        {selectPercentShow && (
          <Select
            name="selectPercent"
            customClass={selectClasses || 'custom-select'}
            placeholder="Resolution"
            value={selectPercent || PERCENT_OPTIONS.find(({value}) => value === percent)}
            onChange={(option) => this.handleChange(option, 'selectPercent')}
            options={PERCENT_OPTIONS}
          />
        )}
        {selectViewsShow && (
          <Select
            name="selectViews"
            customClass={selectClasses || 'custom-select'}
            placeholder="Select Views"
            value={selectViews || VIEW_OPTIONS.find(({value}) => value === views)}
            onChange={(option) => this.handleChange(option, 'selectViews')}
            options={VIEW_OPTIONS}
          />
        )}
        {selectDateShow && (
          <React.Fragment>
            <Select
              name="selectDate"
              customClass={selectClasses || 'custom-select'}
              placeholder="Select Date"
              value={selectDate || DATE_OPTIONS.find(({value}) => value === date)}
              onChange={(option) => this.handleChange(option, 'selectDate')}
              options={[...DATE_OPTIONS]}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default SelectFilters
