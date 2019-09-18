import React from 'react'
import Select from 'Components/Form/SelectField'
import SocialCheckBoxes from 'Components/Form/SocialCheckBoxes/'
import { selectOptions } from './options'
import classnames from 'classnames'
import Range from 'Components/Form/Range'
import { Field, reduxForm } from 'redux-form'
import ColorRadioBoxes from 'Components/Form/ColorRadioBoxes/index'
import style from './style.scss'

const OrderedByComponent = ({ props }) => {
  return (
    !!selectOptions && (
      <div className="w-100 mt-48">
        <Select
          id="OrderedBy"
          name="OrderedBy"
          placeholder="Select One"
          options={selectOptions.orderByOptions}
          label="Ordered By"
          {...props}
        />
      </div>
    )
  )
}
const SocialCheckBoxesComponent = ({ colors, props = false }) => {
  return (
    !!colors && (
      <div className="w-100 mt-48">
        <SocialCheckBoxes colors={colors} {...props} />
      </div>
    )
  )
}

const AgeGenderComponent = ({ props = false }) => {
  return (
    !!selectOptions && (
      <div className="w-100 d-flex justify-space-between mt-48">
        <div
          className={classnames('w-50 ml-0 pr-8', style.sidebarSelectContainer)}
        >
          <Select
            label="Audience Age"
            name="AgeRange"
            id="AgeRange"
            placeholder="Select One"
            options={selectOptions.audienceAge}
            {...props}
          />
        </div>
        <div
          className={classnames('w-50 ml-0 pl-8', style.sidebarSelectContainer)}
        >
          <Select
            options={selectOptions.audienceGender}
            id="Gender"
            name="Gender"
            label="Audience Gender"
            placeholder="Select One"
            {...props}
          />
        </div>
      </div>
    )
  )
}

const DurationComponent = ({ props = false }) => {
  return (
    <div className="w-100 mt-48">
      <Field
        id="Duration"
        name="Duration"
        component={Range}
        minValue={0}
        maxValue={60}
        customClass={style.sidebarDurationRange}
        {...props}
      />
    </div>
  )
}

const ColorRadioBoxesComponent = ({ colors, props = false }) => {
  return (
    !!colors && (
      <div className="w-100 mt-48">
        <ColorRadioBoxes
          colors={colors}
          {...props}
        />
      </div>
    )
  )
}

const VideoFormatComponent = ({ props }) => {
  return (
    !!selectOptions && (
      <div className="w-100 mt-48">
        <Select
          id="VideoFormat"
          name="VideoFormat"
          placeholder="Select One"
          options={selectOptions.videoFormat}
          label="Video Format"
          {...props}
        />
      </div>
    )
  )
}

const AspectRatioComponent = ({ props }) => {
	return (
		!!selectOptions && (
			<div className="w-100 mt-48">
				<Select
					id="AspectRatio"
					name="AspectRatio"
					placeholder="Select One"
					options={selectOptions.aspectRatio}
					label="Aspect Ratio"
					{...props}
				/>
			</div>
		)
	)
}

export {
  OrderedByComponent,
  SocialCheckBoxesComponent,
  AgeGenderComponent,
  DurationComponent,
  ColorRadioBoxesComponent,
	VideoFormatComponent,
	AspectRatioComponent,
}
