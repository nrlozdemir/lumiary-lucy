import Select from 'Components/Form/Select'
import {
  LIKES_OPTIONS,
  RESOLUTION_OPTIONS,
  DURATION_OPTIONS,
  WARM_COLOR_OPTIONS,
  PLATFORM_OPTIONS,
  PERCENT_OPTIONS,
  VIEW_OPTIONS,
  DATE_OPTIONS,
} from './options'

const SelectResolutionShow = ({
  selectResolutionShow,
  selectClasses,
  selectResolution,
  resolution,
  handleChange,
}) => {
  console.log('handleChange: ', handleChange)
  return (
    !!selectResolutionShow &&
    !!handleChange && (
      <Select
        name="selectResolution"
        customClass={selectClasses || 'custom-select'}
        placeholder="Resolution"
        value={
          selectResolution ||
          RESOLUTION_OPTIONS.find(({ value }) => value === resolution)
        }
        onChange={(option) => handleChange(option, 'selectResolution')}
        options={RESOLUTION_OPTIONS}
      />
    )
  )
}

const SelectDurationShow = ({
  selectDurationShow,
  selectClasses,
  selectDuration,
  duration,
  handleChange,
}) => {
  return (
    !!selectDurationShow &&
    !!handleChange && (
      <Select
        name="selectDuration"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select Duration"
        value={
          selectDuration ||
          DURATION_OPTIONS.find(({ value }) => value === duration)
        }
        onChange={(option) => handleChange(option, 'selectDuration')}
        options={DURATION_OPTIONS}
      />
    )
  )
}

const SelectWarmColorShow = ({
  selectWarmColorShow,
  selectClasses,
  selectWarmColor,
  warmColor,
  handleChange,
}) => {
  return (
    !!selectWarmColorShow &&
    !!handleChange && (
      <Select
        name="selectWarmColor"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select One"
        value={
          selectWarmColor ||
          WARM_COLOR_OPTIONS.find(({ value }) => value === warmColor)
        }
        onChange={(option) => handleChange(option, 'selectWarmColor')}
        options={WARM_COLOR_OPTIONS}
      />
    )
  )
}

const SelectLikesShow = ({
  selectLikesShow,
  selectClasses,
  selectLikes,
  likes,
  handleChange,
}) => {
  return (
    !!selectLikesShow &&
    !!handleChange && (
      <Select
        name="selectLikes"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select Views"
        value={
          selectLikes || LIKES_OPTIONS.find(({ value }) => value === likes)
        }
        onChange={(option) => handleChange(option, 'selectLikes')}
        options={LIKES_OPTIONS}
      />
    )
  )
}

const SelectPlatformsShow = ({
  selectPlatformsShow,
  selectClasses,
  selectPlatforms,
  platforms,
  handleChange,
}) => {
  return (
    !!selectPlatformsShow &&
    !!handleChange && (
      <Select
        name="selectPlatforms"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select Platforms"
        value={
          selectPlatforms ||
          PLATFORM_OPTIONS.find(({ value }) => value === platforms)
        }
        onChange={(option) => handleChange(option, 'selectPlatforms')}
        options={PLATFORM_OPTIONS}
      />
    )
  )
}

const SelectPercentShow = ({
  selectPercentShow,
  selectClasses,
  selectPercent,
  percent,
  handleChange,
}) => {
  return (
    !!selectPercentShow &&
    !!handleChange && (
      <Select
        name="selectPercent"
        customClass={selectClasses || 'custom-select'}
        placeholder="Resolution"
        value={
          selectPercent ||
          PERCENT_OPTIONS.find(({ value }) => value === percent)
        }
        onChange={(option) => handleChange(option, 'selectPercent')}
        options={PERCENT_OPTIONS}
      />
    )
  )
}

const SelectViewsShow = ({
  selectViewsShow,
  selectClasses,
  selectViews,
  views,
  handleChange,
}) => {
  return (
    !!selectViewsShow &&
    !!handleChange && (
      <Select
        name="selectViews"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select Views"
        value={selectViews || VIEW_OPTIONS.find(({ value }) => value === views)}
        onChange={(option) => handleChange(option, 'selectViews')}
        options={VIEW_OPTIONS}
      />
    )
  )
}

const SelectDateShow = ({
  selectDateShow,
  selectClasses,
  selectDate,
  date,
  handleChange,
}) => {
  return (
    !!selectDateShow &&
    !!handleChange && (
      <Select
        name="selectDate"
        customClass={selectClasses || 'custom-select'}
        placeholder="Select Date"
        value={selectDate || DATE_OPTIONS.find(({ value }) => value === date)}
        onChange={(option) => handleChange(option, 'selectDate')}
        options={[...DATE_OPTIONS]}
      />
    )
  )
}

export {
  SelectResolutionShow,
  SelectDurationShow,
  SelectWarmColorShow,
  SelectLikesShow,
  SelectPlatformsShow,
  SelectPercentShow,
  SelectViewsShow,
  SelectDateShow,
}
