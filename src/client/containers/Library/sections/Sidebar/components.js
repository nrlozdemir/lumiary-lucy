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
        id="OrderedBy"
        name="OrderedBy"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.orderByOptions}
        label="Ordered By"
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
          label="Audience Gender"
          placeholder="Select One"
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
        name="VideoFormat"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.videoFormat}
        label="Video Format"
        {...props}
      />
    </div>
  )
}

const AspectRatioComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="AspectRatio"
        name="AspectRatio"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.aspectRatio}
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
        id="FramesPerSecond"
        name="FramesPerSecond"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.frameRate}
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
        id="Resolution"
        name="Resolution"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.resolution}
        label="Resolution"
        {...props}
      />
    </div>
  )
}

const PacingComponent = ({ props }) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="Pacing"
        name="Pacing"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.pacing}
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
