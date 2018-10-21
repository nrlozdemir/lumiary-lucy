import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'Reducers/dropzone'
import { unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import update from 'immutability-helper'
import { confirmAlert } from 'react-confirm-alert'
import { mediaUrl } from 'Utils/globals'
import Dialog from 'Components/Dialog'
import {
  Button,
  Fieldset,
  Dropzone,
  UploadFiles,
  UploadDescription
} from 'Components/Form/Controls'
import { AssetGrid } from 'Components/Grids'
import FormFooter from 'Components/Form/Footer'
import FormContainer from 'Components/Form/Container'
import { isEqual } from 'lodash'
import styles from './styles.scss'

/*** 
 * A Formcontainer consisting of:
 * Dropzone
 * AssetGrid
 * UploadFiles
 * UploadDescription
 ***/
class DropzoneAssetGrid extends PureComponent {
  constructor() {
    super()

    this.state = {
      descModalOpen: false,
      assets: [],
      isRemoveItemConfirmModalOpen: false,
      selectedItems: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.assets, prevState.assets)) {
        return { assets: nextProps.assets }
    } else {
      return null
    }
  }
  
  toggleDescModal = () => {
    const { descModalOpen } = this.state
    const { tmp } = this.props

    this.setState({
      descModalOpen: !descModalOpen,
      lastSlide: tmp.length == 1
    })
  }

  handleDelete = (item, index) => {
    const { assets } = this.state
    const { 
      confirmAlert: { message }
    } = this.props
    const updated = assets.filter((asset, i) => i !== index)

    confirmAlert({
      title: '',
      message,
      confirmLabel: 'Yes, remove it!',
      onConfirm: () => {
        this.setState({
          isRemoveItemConfirmModalOpen: true
        })
        this.props.setNewAssets(updated)
      },
      cancelLabel: '',
      belowButtons: () => (
        <a
          className="cancel-alert"
          onClick={this.cancelDelete}
        >
          Wait! I changed my mind!
        </a>
      )
    })
  }

  cancelDelete = () => {
    const target = document.getElementById('react-confirm-alert')
    unmountComponentAtNode(target)
    target.parentNode.removeChild(target)
    document.querySelector('#app').classList.remove('react-confirm-alert-blur')
  }

  handleEdit = (item, index) => {
    const { assets } = this.state
    const { updateDropzone } = this.props

    this.setState({
      descModalOpen: true
    })

    updateDropzone({
      tmp: [item],
      editItem: {
        data: item,
        index,
      }
    })
  }

  handleDescSubmit = (data) => {
    const { assets } = this.state
    const { 
      dispatch, tmp, editItem, 
      updateDropzone, resetDropzone,
      handleDescSubmitCustom
    } = this.props

    if(handleDescSubmitCustom) {
      handleDescSubmitCustom(data)
    } else {
      let newAssets = []

      if (editItem) {
        newAssets = update(assets, {
          [editItem.index]: { $set: data[0] }
        })
      } else {
        const batch = data.map(item => ({
          ...item,
          description: item.description || '',
          title: item.title || '',
        }))
        newAssets = assets.concat(batch)
      }
      this.props.setNewAssets(newAssets)
    }

    this.setState({
      descModalOpen: false,
      lastSlide: false
    })

    resetDropzone()
  }

  handleCancelUpload = () => {
    this.setState({
      lastSlide: false,
      descModalOpen: false
    })
    this.props.toggleDropzoneModal()
  }

  renderUploadDescDialog = () => {
    const {
      uploading,
      descModalOpen,
    } = this.state
    const {
      tmp,
      editItem,
      uploadDescription: { titleLabel, descLabel }
    } = this.props

    return (
      <Dialog
        isOpen={descModalOpen}
        className="descriptions"
        toggleModal={() => {
          if (!editItem) {
            this.toggleDescModal()
          } else {
            this.setState({
              descModalOpen: false,
            })
          }
        }}
        closeButton
      >
        <UploadDescription
          form={'uploadDescriptionForm'}
          items={tmp}
          editMode={!!editItem}
          {...(editItem ? { initialValues: { items: [editItem.data] }} : {})}
          handleDescSubmit={this.handleDescSubmit}
          titleLabel={titleLabel}
          descLabel={descLabel}
          editItem={editItem}
          header="Why did you choose this example"
        />
      </Dialog>
    )
  }

  render() {
    const {
      assets
    } = this.state
    const { 
      renderFormHeader, 
      renderFormLegend, 
      renderAssetGrid, 
      renderFormFooter
    } = this.props

    return (
      <div className={styles.assetsWrapper}>
        <FormContainer className={styles.formContainer}>
          { renderFormHeader() }
          <Fieldset>
            { renderFormLegend() }
            <Dropzone
              s3Url={mediaUrl}
              prompt="drop or upload files here"
              handleConfirmUpload={this.toggleDescModal}
              handleCancelUpload={this.handleCancelUpload}
              dialog={{
                msg: "Closing this window will remove this bunch of assets. Ok with you?",
                label: "Add Descriptions"
              }}
            />
          </Fieldset>
          { !!assets.length &&
            renderAssetGrid(this.handleEdit, this.handleDelete) }
          { renderFormFooter() }
        </FormContainer>
        { this.renderUploadDescDialog() }
        <br />
      </div>
    )
  }
}

DropzoneAssetGrid.defaultProps = {
  renderFormHeader: () => {},
  renderFormLegend: () => {},
  renderAssetGrid: () => {},
  renderFormFooter: () => {},
  uploadDescription: {
    titleLabel: "Name this asset...",
    descLabel: "What is this asset for?"
  },
  confirmAlert: {
    message: "You are removing your asset."
  },
  handleDescSubmitCustom: null
}

DropzoneAssetGrid.propTypes = {
  renderAssetGrid: PropTypes.func,
  renderFormFooter: PropTypes.func,
  renderFormHeader: PropTypes.func,
  renderFormLegend: PropTypes.func,
  setNewAssets: PropTypes.func,
  uploadDescription: PropTypes.object,
  confirmAlert: PropTypes.object,
  handleDescSubmitCustom: PropTypes.func
}

const mapStateToProps = (state) => {
  const { 
    dropzone: { 
      files, tmp, editItem, modalOpen 
    } 
  } = state

  return {
    files,
    tmp,
    editItem,
    modalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneAssetGrid)
