import React from 'react'
import Select from 'Components/Form/SelectField'
import SocialCheckBoxes from 'Components/Form/SocialCheckBoxes/'
import { selectOptions } from './options'
import classnames from 'classnames'
import Range from 'Components/Form/Range'
import { Field, reduxForm } from 'redux-form'
import ColorRadioBoxes from 'Components/Form/ColorRadioBoxes/index'

import Button from 'Components/Form/Button'

import style from './style.scss'

const OrderedByComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        placeholder="Select One"
        id="OrderedBy"
        name="OrderedBy"
        label="Ordered By"
        options={!!selectOptions && selectOptions.orderByOptions}
        {...props}
      />
    </div>
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
    <div className="w-100 d-flex justify-space-between mt-48">
      <div
        className={classnames('w-50 ml-0 pr-8', style.sidebarSelectContainer)}
      >
        <Select
          label="Audience Age"
          name="AgeRange"
          id="AgeRange"
          placeholder="Select One"
          options={!!selectOptions && selectOptions.audienceAge}
          {...props}
        />
      </div>
      <div
        className={classnames('w-50 ml-0 pl-8', style.sidebarSelectContainer)}
      >
        <Select
          options={!!selectOptions && selectOptions.audienceGender}
          id="Gender"
          name="Gender"
          placeholder="Select One"
          label="Audience Gender"
          {...props}
        />
      </div>
    </div>
  )
}

const DurationComponent = ({ props = false }) => {
  return (
    <div className="w-100 mt-48">
      <Field
        component={Range}
        minValue={0}
        maxValue={60}
        customClass={style.sidebarDurationRange}
        id="Duration"
        name="Duration"
        {...props}
      />
    </div>
  )
}

const ColorRadioBoxesComponent = ({ colors, props = false }) => {
  return (
    <div className="w-100 mt-48">
      <ColorRadioBoxes colors={!!colors && colors} {...props} />
    </div>
  )
}

const VideoFormatComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="VideoFormat"
        options={!!selectOptions && selectOptions.videoFormat}
        name="VideoFormat"
        label="Video Format"
        placeholder="Select One"
        {...props}
      />
    </div>
  )
}

const AspectRatioComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        options={!!selectOptions && selectOptions.aspectRatio}
        id="AspectRatio"
        placeholder="Select One"
        name="AspectRatio"
        label="Aspect Ratio"
        {...props}
      />
    </div>
  )
}

const FramesPerSecondComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        name="FramesPerSecond"
        options={!!selectOptions && selectOptions.frameRate}
        id="FramesPerSecond"
        placeholder="Select One"
        label="Frame Rate"
        {...props}
      />
    </div>
  )
}

const ResolutionComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        label="Resolution"
        options={!!selectOptions && selectOptions.resolution}
        id="Resolution"
        name="Resolution"
        placeholder="Select One"
        {...props}
      />
    </div>
  )
}

const PacingComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        placeholder="Select One"
        options={!!selectOptions && selectOptions.pacing}
        id="Pacing"
        name="Pacing"
        label="Pacing"
        {...props}
      />
    </div>
  )
}

const ButtonsComponent = ({ props, colors }) => {
  return (
    <React.Fragment>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <Button
          customClass={classnames('mt-48', style.sidebarApplyButton, {
            [style.formChange]: !!props && !!props.formChange && props.formChange === true,
          })}
          /*onClick={() => formChange === true && setSidebarVisible(false)}
          textColor={
            !formChange
              ? colors.customSelectActiveBorder
              : colors.searchInputActiveColor
          }*/
          buttonText="Apply Filters"
        />
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <span
          className={style.cancel}
          /*onClick={() => setSidebarVisible(false)}*/
          style={{
            color: colors.filterText,
          }}
        >
          Cancel
        </span>
      </div>
    </React.Fragment>
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
  FramesPerSecondComponent,
  ResolutionComponent,
  PacingComponent,
  ButtonsComponent,
}
