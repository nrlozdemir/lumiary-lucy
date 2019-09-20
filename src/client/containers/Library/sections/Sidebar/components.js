import React from 'react'
import Select from 'Components/Form/SelectField'
import SocialCheckBoxes from 'Components/Form/SocialCheckBoxes/'
import { selectOptions } from './options'
import classnames from 'classnames'
import Range from 'Components/Form/Range'
import { Field } from 'redux-form'
import ColorRadioBoxes from 'Components/Form/ColorRadioBoxes/index'
import Button from 'Components/Form/Button'
import style from './style.scss'

const OrderedByComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="OrderedBy"
        name="OrderedBy"
        label="Ordered By"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.orderByOptions}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}
const SocialCheckBoxesComponent = ({ colors, formChange }) => {
  return (
    !!colors && (
      <div className="w-100 mt-48">
        <SocialCheckBoxes colors={colors} clickEvent={formChange} />
      </div>
    )
  )
}

const AgeRangeComponent = (props) => {
  return (
    <div className={classnames('w-50 ml-0 pr-8', style.sidebarSelectContainer)}>
      <Select
        id="AgeRange"
        name="AgeRange"
        label="Audience Age"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.audienceAge}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const GenderComponent = (props) => {
  return (
    <div className={classnames('w-50 ml-0 pl-8', style.sidebarSelectContainer)}>
      <Select
        id="Gender"
        name="Gender"
        label="Audience Gender"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.audienceGender}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const AgeGenderComponent = (props) => {
  return (
    <div className="w-100 d-flex justify-space-between mt-48">
      <AgeRangeComponent formChange={props.formChange} />
      <GenderComponent formChange={props.formChange} />
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
      />
    </div>
  )
}

const ColorRadioBoxesComponent = ({ colors, formChange }) => {
  return (
    <div className="w-100 mt-48">
      <ColorRadioBoxes
        colors={!!colors && colors}
        clickEvent={!!formChange && formChange}
      />
    </div>
  )
}

const VideoFormatComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="VideoFormat"
        name="VideoFormat"
        label="Video Format"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.videoFormat}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const AspectRatioComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="AspectRatio"
        name="AspectRatio"
        label="Aspect Ratio"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.aspectRatio}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const FramesPerSecondComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="FramesPerSecond"
        name="FramesPerSecond"
        label="Frame Rate"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.frameRate}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const ResolutionComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="Resolution"
        name="Resolution"
        label="Resolution"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.resolution}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const PacingComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        id="Pacing"
        name="Pacing"
        label="Pacing"
        placeholder="Select One"
        options={!!selectOptions && selectOptions.pacing}
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const ButtonsComponent = ({ formChangeState, colors, setSidebarVisible }) => {
  return (
    <React.Fragment>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <Button
          customClass={classnames('mt-48', style.sidebarApplyButton, {
            [style.formChange]: !!formChangeState && formChangeState === true,
          })}
          onClick={() => formChangeState === true && setSidebarVisible(false)}
          textColor={
            !formChangeState
              ? colors.customSelectActiveBorder
              : colors.searchInputActiveColor
          }
          buttonText="Apply Filters"
        />
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center">
        <span
          className={style.cancel}
          onClick={() => setSidebarVisible(false)}
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
