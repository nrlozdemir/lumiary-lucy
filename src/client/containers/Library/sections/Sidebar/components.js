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
        placeholder="Select One"
        id="OrderedBy"
        name="OrderedBy"
        label="Ordered By"
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

const AgeGenderComponent = (props) => {
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
          onChange={!!props.formChange && props.formChange}
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
          onChange={!!props.formChange && props.formChange}
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
        options={!!selectOptions && selectOptions.videoFormat}
        name="VideoFormat"
        label="Video Format"
        placeholder="Select One"
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const AspectRatioComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        options={!!selectOptions && selectOptions.aspectRatio}
        id="AspectRatio"
        placeholder="Select One"
        name="AspectRatio"
        label="Aspect Ratio"
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const FramesPerSecondComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        name="FramesPerSecond"
        options={!!selectOptions && selectOptions.frameRate}
        id="FramesPerSecond"
        placeholder="Select One"
        label="Frame Rate"
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const ResolutionComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        label="Resolution"
        options={!!selectOptions && selectOptions.resolution}
        id="Resolution"
        name="Resolution"
        placeholder="Select One"
        onChange={!!props.formChange && props.formChange}
      />
    </div>
  )
}

const PacingComponent = (props) => {
  return (
    <div className="w-100 mt-48">
      <Select
        placeholder="Select One"
        label="Pacing"
        options={!!selectOptions && selectOptions.pacing}
        id="Pacing"
        onChange={!!props.formChange && props.formChange}
        name="Pacing"
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
