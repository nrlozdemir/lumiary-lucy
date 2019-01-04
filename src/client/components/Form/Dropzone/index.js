import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'Reducers/dropzone'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import PropTypes from 'prop-types'
import cx from 'classnames'
import update from 'immutability-helper'
import { UploadFiles } from 'Components/Form/Controls'
import Dialog from 'Components/Dialog'
import { isEqual, isEmpty } from 'lodash'
import style from './styles.scss'
import { staticUrl, mediaUrl } from 'Utils/globals'

class DropzoneDisplay extends React.Component {
  renderFileUpload = (uploadedFile, i) => {
    const {
      signedUrl,
      filename, // s3 filename
      fileUrl, // full s3 url of the file
      file, // file descriptor from the upload
    } = uploadedFile

    return (
      <div key={i}>
        <p>{file.name}</p>
      </div>
    )
  }

  render() {
    const {
      className,
      uploadedFiles,
      s3Url,
      prompt,
      backgroundImage,
    } = this.props

    return (
      <div
        className={cx(style.dropzone, {
          [style.dropzoneHasImage]: !!backgroundImage,
        })}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {uploadedFiles.map((file, idx) => (
          <div key={idx} />
        ))}
        <div className={style.dropzoneInstructions}>
          <p>{prompt}</p>
        </div>
      </div>
    )
  }
}

DropzoneDisplay.propTypes = {
  uploadedFiles: PropTypes.array,
  s3Url: PropTypes.string,
}

class Dropzone extends React.Component {
  constructor() {
    super()
  }

  componentDidUpdate(prevProps) {
    const { modalOpen, updateDropzone, resetDropzone } = this.props
    if (modalOpen !== prevProps.modalOpen && !modalOpen) {
      resetDropzone()
    }
  }

  handleUpload = (data) => {
    const {
      dialog,
      updateEditItem,
      tmp,
      uploading,
      handleUpload,
      editItem,
    } = this.props
    const {
      signedUrl,
      file: { type, name, size },
    } = data
    const asset = {
      url: signedUrl.split('?')[0],
      type: type,
      filename: name,
      size: size,
    }

    const updatedUploading = uploading.length
      ? update(uploading, { [0]: { $set: false } }).filter((status) => status)
      : []
    const updatedTmp = editItem ? [{ ...tmp[0], ...asset }] : tmp.concat(asset)
    const updatedEditItem = editItem
      ? update(editItem, { data: { $merge: asset } })
      : null

    handleUpload({
      updatedTmp,
      updatedUploading,
      updatedEditItem,
    })

    if (!dialog && !editItem) {
      this.handleFinished()
    }
  }

  handleDrop = (accepted) => {
    console.log(accepted, 'accepted')
    const {
      files,
      editItem,
      uploading,
      handleDrop,
      toggleDropzoneModal,
      uniqueModalOpen,
      toggleModal,
    } = this.props

    handleDrop({
      files: files.concat(accepted),
      uploading: Array.from({ length: accepted.length }, () => true),
    })

    if (!editItem) {
      uniqueModalOpen !== null ? toggleModal() : toggleDropzoneModal()
    }
  }

  handleProgress = (amt, textstate, file) => {
    const { progress, handleProgress } = this.props

    const fileName = file.name
    const spec = {
      name: fileName,
      amt,
      textstate,
    }

    handleProgress({
      progress: update(progress, {
        [fileName]: { $set: spec },
      }),
    })
  }

  handleFinished = (confirm = true) => {
    const {
      dialog,
      handleConfirmUpload,
      handleCancelUpload,
      updateDropzone,
      resetDropzone,
    } = this.props

    if (confirm) {
      handleConfirmUpload()
    } else {
      handleCancelUpload()
    }

    if (!dialog || !confirm) {
      resetDropzone()
    }
  }

  renderUploadFilesDialog = (dialog) => {
    const {
      toggleDropzoneModal,
      progress,
      uploading,
      modalOpen,
      uniqueModalOpen,
      toggleModal,
      type,
    } = this.props

    return (
      <Dialog
        isOpen={uniqueModalOpen !== null ? uniqueModalOpen : modalOpen}
        toggleModal={toggleModal ? toggleModal : toggleDropzoneModal}
        extraClasses={style.uploadDialog}
        confirmAlert
        closeButton
        closeButtonClassName={style.uploadDialog_close}
        confirmProps={{
          msg: dialog.msg,
          confirmLabel: 'Yes, remove it!',
          cancelLabel: 'Wait! I changed my mind!',
          handleConfirm: () => this.handleFinished(false),
          belowButtons: (
            <a
              className="cancel-dialog"
              onClick={() => this.handleFinished(false)}
            >
              I changed my mind.
            </a>
          ),
        }}
      >
        <UploadFiles
          files={progress}
          headerText={!!uploading.length ? 'Uploading..' : 'Uploaded'}
          buttonLabel={dialog.label}
          handleClick={this.handleFinished}
          uploading={!!uploading.length}
          disabled={!!uploading.length}
          type={type}
        />
      </Dialog>
    )
  }

  render() {
    const {
      className,
      innerClassName,
      dropzoneClassName,
      handleUploadCustom,
      handleDropCustom,
      handleProgressCustom,
      s3Url,
      prompt,
      children,
      multiple,
      backgroundImage,
      dialog,
      isProfileImage,
    } = this.props

    return (
      <div className={style.dropzoneContainer}>
        <DropzoneS3Uploader
          onFinish={handleUploadCustom ? handleUploadCustom : this.handleUpload}
          onDrop={handleDropCustom ? handleDropCustom : this.handleDrop}
          multiple={multiple}
          onProgress={
            handleProgressCustom ? handleProgressCustom : this.handleProgress
          }
          notDropzoneProps={[
            'onDrop',
            'onFinish',
            'isImage',
            'notDropzoneProps',
          ]}
          s3Url={s3Url || 'https://s3.amazonaws.com/quickframe-media-dev/'}
          className={cx(style.dropzoneInner, className, {
            [style.profileImage]: isProfileImage,
            [style.coverImage]: !isProfileImage,
          })}
        >
          {children ? (
            children
          ) : (
            <DropzoneDisplay
              prompt={prompt}
              backgroundImage={backgroundImage}
            />
          )}
        </DropzoneS3Uploader>

        {dialog && this.renderUploadFilesDialog(dialog)}
      </div>
    )
  }
}

/*
 * {dialog} - once the dropzone finishes uploading,
 ** a dialog modal can be rendered for further action.
 ** ex. uploading a user image, and letting the user click to confirm the upload
 * {editItem} - the current item being edited
 * {handleConfirmUpload} - prop function called after upload is complete
 * {handleCancelUpload} - prop function called after user cancels upload
 * {uniqueModalOpen} - sometimes there are two dropzones with two dialogs each - etc brand profile
 ** keeps track of each, instead of tracking one through the store
 * {toggleModal} - used for unique modals
 */
Dropzone.propTypes = {
  className: PropTypes.string,
  handleUploadCustom: PropTypes.func,
  handleDropCustom: PropTypes.func,
  handleProgressCustom: PropTypes.func,
  s3Url: PropTypes.string,
  dialog: PropTypes.object,
  editItem: PropTypes.object,
  handleConfirmUpload: PropTypes.func,
  handleCancelUpload: PropTypes.func,
  uniqueModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  type: PropTypes.string,
}

Dropzone.defaultProps = {
  multiple: true,
  s3Url: mediaUrl,
  handleUploadCustom: null,
  handleDropCustom: null,
  handleProgressCustom: null,
  dialog: null,
  uniqueModalOpen: null,
  toggleModal: null,
  handleConfirmUpload: () => {},
  handleCancelUpload: () => {},
  type: 'buyer',
}

const mapStateToProps = (state) => {
  const {
    dropzone: { files, tmp, progress, uploading, modalOpen, editItem },
  } = state

  return {
    files,
    tmp,
    progress,
    uploading,
    modalOpen,
    editItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropzone)
