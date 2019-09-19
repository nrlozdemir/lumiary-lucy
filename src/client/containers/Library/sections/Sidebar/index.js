import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import {
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
} from './components'
import style from './style.scss'

const ResetButton = (props) => {
  return (
    <span
      className="float-right color-cool-blue"
      /* onClick={this.resetFormValues} */
    >
      Reset
    </span>
  )
}

const FilterVideos = ({ colors }) => {
  return (
    <span
      className="float-left"
      style={{
        color: colors.filterHeaderText,
      }}
    >
      Filter Videos
    </span>
  )
}

const SidebarHeader = ({ colors, fixedHeader }) => {
  return (
    <div
      className={classnames(style.sidebarHeader, {
        [style.fixed]: fixedHeader,
      })}
      style={{ backgroundColor: colors.filterHeader }}
    >
      <p className={style.text}>
        <FilterVideos colors={colors} />
        <ResetButton />
      </p>
      <div className="clearFix" />
    </div>
  )
}

const FormWrapper = ({
  children,
  colors,
  fixedHeader,
  handleSubmit,
  sidebarVisible,
  setSidebarVisible,
  formChange,
}) => {
  return (
    <form /* onSubmit={(e) => handleSubmit(e)} */>
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
          <SidebarHeader colors={colors} fixedHeader={fixedHeader} />
          <div
            className={classnames(style.sidebarContent, 'ph-32', {
              [style.fixed]: fixedHeader,
              'mt-80': fixedHeader,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </form>
  )
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarVisible: false,
      fixedHeader: true,
    }

    this.resetFormValues = this.resetFormValues.bind(this)
    this.formChanged = this.formChanged.bind(this)
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

  formChanged() {
    this.setState({
      formChange: true,
    })
  }

  render() {
    return (
      <FormWrapper formChange={this.state.formChange} {...this.props}>
        {!!this.props.colors && (
          <React.Fragment>
            <OrderedByComponent />
            <SocialCheckBoxesComponent colors={this.props.colors} />
            <AgeGenderComponent />
            <DurationComponent />
            <ColorRadioBoxesComponent colors={this.props.colors} />
            <VideoFormatComponent />
            <AspectRatioComponent />
            <FramesPerSecondComponent />
            <ResolutionComponent />
            <PacingComponent />
            <ButtonsComponent
              formChange={this.state.formChange}
              colors={this.props.colors}
            />
          </React.Fragment>
        )}
      </FormWrapper>
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
