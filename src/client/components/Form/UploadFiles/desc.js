import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import cx from 'classnames'
import Slider from 'react-slick'
import merge from 'lodash/merge'
import { staticUrl } from 'Utils/globals'
import { required } from 'Utils/validate'

import { Pane } from 'Components/Layout'
import {
  Fieldset,
  Legend,
  Dropzone,
  TextField,
  Textarea,
  Input,
  UploadFiles,
} from 'Components/Form/Controls'
import FormFooter from 'Components/Form/Footer'
import FormButton from 'Components/Form/Controls/Button'
import { getMimeType } from 'Utils'

import style from './styles.scss'

class UploadDescription extends React.Component {
  constructor() {
    super()

    this.state = {
      lastSlide: false,
    }
  }

  componentDidMount = () => {
    const { items } = this.props

    this.setState({
      lastSlide: items.length == 1,
    })

    this.inputNode && this.inputNode.getElementsByTagName('input')[0].focus()
  }

  nextSlide = () => {
    const { lastSlide } = this.state
    const { handleDescSubmit, currentFormValues, items } = this.props

    if (lastSlide) {
      this.setState(
        {
          lastSlide: false,
        },
        () => {
          handleDescSubmit(
            merge(items, currentFormValues ? currentFormValues.items || [] : [])
          )
        }
      )
    } else {
      this.slider.slickNext()
    }
  }

  prevSlide = () => {
    this.slider.slickPrev()
  }

  afterSlideChange = (slideIdx) => {
    const {
      state: { slideCount },
    } = this.slider.innerSlider

    this.setState({
      lastSlide: slideIdx + 1 == slideCount,
    })
  }

  render() {
    const {
      valid,
      items,
      editMode,
      showTitle,
      descLabel,
      titleLabel,
      handleSubmit,
      handleUpload,
      handleDrop,
      handleProgress,
      files,
      uploading,
      header,
    } = this.props

    return (
      <Slider
        ref={(c) => (this.slider = c)}
        infinite={false}
        speed={90}
        arrows={false}
        draggable={false}
        afterChange={this.afterSlideChange}
      >
        {items.map((item, idx) => {
          const imgUrl =
            'application' != getMimeType(item.url)
              ? item.url
              : `${staticUrl}img/no_preview_icon.svg`

          return (
            <form key={idx} className="description">
              <div className={style.pane}>
                <div className={style.imagePane}>
                  <div className={style.previewImg}>
                    {false ? (
                      <div
                        className={cx(style.dropzoneEditArea, {
                          [style.uploading]: uploading,
                        })}
                      >
                        {uploading && (
                          <img
                            src={`${staticUrl}img/loading_gifs/ajax-loader.gif`}
                          />
                        )}
                        <Dropzone
                          handleUpload={handleUpload}
                          handleDrop={handleDrop}
                          handleProgress={handleProgress}
                          className={style.singleDropzone}
                          multiple={false}
                        >
                          {item.url.match(/\.(mp4)/g) ? (
                            <video muted>
                              <source type="video/mp4" src={item.url} />
                            </video>
                          ) : (
                            <img src={item.url} />
                          )}
                          <div className={style.dropzoneInstructions}>
                            <p>drop or upload file here</p>
                          </div>
                        </Dropzone>
                      </div>
                    ) : item.url && item.url.match(/\.(mp4)/g) ? (
                      <video controls>
                        <source type="video/mp4" src={item.url} />
                      </video>
                    ) : (
                      <img src={imgUrl} />
                    )}
                  </div>
                  <div>
                    <p>{item.filename}</p>
                  </div>
                </div>

                <div className={style.descriptionPane}>
                  {header && <h1>{header}</h1>}
                  <Fieldset>
                    {showTitle ? (
                      <div ref={(input) => (this.inputNode = input)}>
                        <TextField
                          name={`items[${idx}]title`}
                          component={Input}
                          placeholder={titleLabel}
                          maxLength={50}
                          counterClass="padded"
                          validate={required}
                        />
                      </div>
                    ) : null}

                    <TextField
                      name={`items[${idx}]description`}
                      component={Textarea}
                      maxLength={250}
                      rows="8"
                      placeholder={descLabel}
                      counterClass="padded"
                      validate={required}
                    />
                  </Fieldset>

                  <FormFooter>
                    {items.length > 1 && idx !== 0 ? (
                      <FormButton
                        className="blue"
                        type="button"
                        label="Prev"
                        onClick={this.prevSlide}
                      />
                    ) : null}
                    <FormButton
                      className="yellow"
                      type="button"
                      label="Add"
                      onClick={this.nextSlide}
                    />
                  </FormFooter>
                </div>
              </div>
            </form>
          )
        })}
      </Slider>
    )
  }
}

UploadDescription.propTypes = {}

UploadDescription.defaultProps = {
  showTitle: true,
  header: null,
}

const mapStateToProps = (state) => ({
  currentFormValues: state.form.uploadDescriptionForm
    ? state.form.uploadDescriptionForm.values
    : {},
})

const formConfiguration = {
  form: 'uploadDescriptionForm',
  enableReinitialize: true,
}

export default connect(mapStateToProps)(
  reduxForm(formConfiguration)(UploadDescription)
)
