import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Select from 'Components/Form/SelectField'
import Button from 'Components/Form/Button'
import { selectOptions } from './options'
import {
  OrderedByComponent,
  SocialCheckBoxesComponent,
  AgeGenderComponent,
  DurationComponent,
	ColorRadioBoxesComponent,
	VideoFormatComponent,
	AspectRatioComponent,
} from './components'
import style from './style.scss'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      fixedHeader: true,
    }

    this.resetFormValues = this.resetFormValues.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  // componentDidUpdate(prevProps) {
  //   const { sidebarVisible } = this.props
  //   if (sidebarVisible !== prevProps.sidebarVisible && !sidebarVisible) {
  //     this.resetFormValues()
  //   }
  // }

  resetFormValues = () => {
    const { reset, changeFilter } = this.props
    reset()
    changeFilter()
  }

  formChange() {
    this.setState({
      formChange: true,
    })
  }

  render() {
    const { formChange } = this.state
    const {
      colors,
      fixedHeader,
      handleSubmit,
      sidebarVisible,
      setSidebarVisible,
    } = this.props

    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className={classnames(style.sidebar, {
            [style.sidebarVisible]: sidebarVisible,
            [style.fixed]: fixedHeader,
          })}
          style={{ backgroundColor: colors.duskBackground }}
        >
          <div
            className={classnames(style.sidebarMain, {
              [style.fixed]: fixedHeader,
            })}
          >
            <div
              className={classnames(style.sidebarHeader, {
                [style.fixed]: fixedHeader,
              })}
              style={{ backgroundColor: colors.filterHeader }}
            >
              <p className={style.text}>
                <span
                  className="float-left"
                  style={{
                    color: colors.filterHeaderText,
                  }}
                >
                  Filter Videos
                </span>
                <span
                  className="float-right color-cool-blue"
                  onClick={this.resetFormValues}
                >
                  Reset
                </span>
              </p>
              <div className="clearFix" />
            </div>
            <div
              className={classnames(style.sidebarContent, 'ph-32', {
                [style.fixed]: fixedHeader,
                'mt-80': fixedHeader,
              })}
            >
							{!!colors && (
								<React.Fragment>
									<OrderedByComponent />
									<SocialCheckBoxesComponent colors={colors} />
									<AgeGenderComponent />
									<DurationComponent />
									<ColorRadioBoxesComponent colors={colors} />
									<VideoFormatComponent />
									<AspectRatioComponent />
								</React.Fragment>
							)}


              <div className="w-100 mt-48">
                <Select
                  id="FramesPerSecond"
                  name="FramesPerSecond"
                  placeholder="Select One"
                  options={!!selectOptions && selectOptions.frameRate}
                  label="Frame Rate"
                  onChange={this.formChange}
                />
              </div>
              <div className="w-100 mt-48">
                <Select
                  id="Resolution"
                  name="Resolution"
                  placeholder="Select One"
                  options={!!selectOptions && selectOptions.resolution}
                  label="Resolution"
                  onChange={this.formChange}
                />
              </div>
              <div className="w-100 mt-48">
                <Select
                  id="Pacing"
                  name="Pacing"
                  placeholder="Select One"
                  options={!!selectOptions && selectOptions.pacing}
                  label="Pacing"
                  onChange={this.formChange}
                />
              </div>
              <div className="w-100 d-flex align-items-center justify-content-center">
                <Button
                  customClass={classnames('mt-48', style.sidebarApplyButton, {
                    [style.formChange]: formChange === true,
                  })}
                  onClick={() =>
                    formChange === true && setSidebarVisible(false)
                  }
                  textColor={
                    !formChange
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
            </div>
          </div>
        </div>
      </form>
    )
  }
}

Sidebar.propTypes = {
  sidebarVisible: PropTypes.bool,
  fixedHeader: PropTypes.bool,
}

export default reduxForm({
  form: 'sidebar',
  destroyOnUnmount: false,
})(Sidebar)
