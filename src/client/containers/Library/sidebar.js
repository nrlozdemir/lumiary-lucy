import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import style from './style.scss'

import Select from 'Components/Form/SelectField'
import Button from 'Components/Form/Button'
import SocialCheckBoxes from 'Components/Form/SocialCheckBoxes/'
import ColorRadioBoxes from 'Components/Form/ColorRadioBoxes/index'
import Range from 'Components/Form/Range'

const Sidebar = (props) => {
	const { reset, handleSubmit } = props
  const sidebarClass = classnames(style.sidebar, {
		[style.sidebarVisible]: props.sidebarVisible,
		[style.fixed] : props.fixedHeader
	})
	const sidebarMainClass = classnames(style.sidebarMain, {
		[style.fixed] : props.fixedHeader
	})
	const sidebarHeaderClass = classnames(style.sidebarHeader, {
		[style.fixed] : props.fixedHeader
	})
	const sidebarContentClass = classnames(
		style.sidebarContent,
		'ph-32',
		{
			[style.fixed]: props.fixedHeader,
			'mt-80': props.fixedHeader
		})

  const selectOptions = {
    orderByOptions: [
      { value: 'mostViewedVideos', label: 'Most Viewed Videos' },
      { value: 'mostLikedVideos', label: 'Most Liked Videos' },
      { value: 'mostSharedVideos', label: 'Most Shared Videos' },
      { value: 'mostCommentedVideos', label: 'Most Commented Videos' },
    ],
    audienceGender: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
    audienceAge: [
      { value: '10-', label: '10 and under' },
      { value: '11-17', label: '11-17 yrs' },
      { value: '18-20', label: '18-20 yrs' },
      { value: '21-24', label: '21-24 yrs' },
      { value: '25-34', label: '25-34 yrs' },
      { value: '35-64', label: '35-64 yrs' },
      { value: '65+', label: '65 and over' },
    ],
    videoFormat: [
      { value: 'liveAction', label: 'Live Action' },
      { value: 'cinemagraph', label: 'Cinemagraph' },
      { value: 'stopMotion', label: 'Stop Motion' },
      { value: 'animation', label: 'Animation' },
    ],
    frameRate: [
      { value: '24', label: '24 Fps' },
      { value: '30', label: '30 Fps' },
      { value: '50', label: '50 Fps' },
    ],
    aspectRatio: [
      { value: '16:9', label: '16:9' },
      { value: '1:1', label: '1:1' },
      { value: '4:3', label: '4:3' },
      { value: '9:16', label: '9:16' },
    ],
    resolution: [
      { value: '4K', label: '4K' },
      { value: '1080p', label: '1080p' },
      { value: '720p', label: '720p' },
      { value: '480p', label: '480p' },
      { value: '360p', label: '360p' },
    ],
    pacing: [
      { value: 'Slow', label: 'Slow' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Fast', label: 'Fast' },
    ],
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={sidebarClass}>
        <div className={sidebarMainClass}>
					<div className={sidebarHeaderClass}>
						<p className={style.text}>
							<span className="float-left color-dark-blue-grey">
								Filter Videos
							</span>
							<span className="float-right color-cool-blue" onClick={reset}>
								Reset
							</span>
						</p>
						<div className="clearFix" />
					</div>
					<div className={sidebarContentClass}>
						<div className="w-100 mt-48 d-flex flex-column align-items-start justify-content-center">
							<Select
								id="OrderedBy"
								name="OrderedBy"
								placeholder="Select One"
								options={selectOptions.orderByOptions}
								label="Ordered By"
							/>
						</div>
						<div className="w-100 mt-48">
							<SocialCheckBoxes />
						</div>
						<div className="w-100 d-flex justify-space-between mt-48">
							<div className="w-50 ml-0 pr-8">
								<Select
									id="AgeRange"
									name="AgeRange"
									placeholder="Select One"
									options={selectOptions.audienceAge}
									label="Audience Age"
								/>
							</div>
							<div className="w-50 ml-0 pl-8">
								<Select
									id="Gender"
									name="Gender"
									placeholder="Select One"
									options={selectOptions.audienceGender}
									label="Audience Gender"
								/>
							</div>
						</div>
						<div className="w-100 mt-48">
							<Field
								id="Duration"
								name="Duration"
								component={Range}
								minValue={0}
								maxValue={60}
							/>
						</div>
						<div className="w-100 mt-48">
							<ColorRadioBoxes />
						</div>
						<div className="w-100 mt-48">
							<Select
								id="VideoFormat"
								name="VideoFormat"
								placeholder="Select One"
								options={selectOptions.videoFormat}
								label="Video Format"
							/>
						</div>
						<div className="w-100 mt-48">
							<Select
								id="AspectRatio"
								name="AspectRatio"
								placeholder="Select One"
								options={selectOptions.aspectRatio}
								label="Aspect Ratio"
							/>
						</div>
						<div className="w-100 mt-48">
							<Select
								id="FramesPerSecond"
								name="FramesPerSecond"
								placeholder="Select One"
								options={selectOptions.frameRate}
								label="Frame Rate"
							/>
						</div>
						<div className="w-100 mt-48">
							<Select
								id="Resolution"
								name="Resolution"
								placeholder="Select One"
								options={selectOptions.resolution}
								label="Resolution"
							/>
						</div>
						<div className="w-100 mt-48">
							<Select
								id="Pacing"
								name="Pacing"
								placeholder="Select One"
								options={selectOptions.pacing}
								label="Pacing"
							/>
						</div>
						<div className="w-100 d-flex align-items-center justify-content-center">
							<Button
								customClass={classnames('mt-48', style.sidebarApplyButton)
								}
								buttonText="Apply Filters"
							/>
						</div>
						<div className="w-100 d-flex align-items-center justify-content-center">
							<span
								className={style.cancel}
								onClick={() => props.setSidebarVisible(false)}
							>
								Cancel
							</span>
						</div>
					</div>
				</div>
      </div>
    </form>
  )
}

Sidebar.propTypes = {
	sidebarVisible: PropTypes.bool,
	fixedHeader: PropTypes.bool,
}

export default reduxForm({
  form: 'sidebar',
})(Sidebar)
