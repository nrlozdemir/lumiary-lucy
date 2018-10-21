import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'Reducers/dropzone'
import PropTypes from 'prop-types'
import cx from 'classnames'
import update from 'immutability-helper'

import Dialog from 'Components/Dialog'
import { Dropzone, UploadFiles } from 'Components/Form/Controls'

import styles from './styles.scss'

class ProfileImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    };
  }

  handleSubmit = () => { 
    const { 
      tmp, 
      submitImage,
      resetDropzone
    } = this.props

    this.toggleModal()
    submitImage(tmp)
    resetDropzone()
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const { image, prompt, type } = this.props;
    const {
      progress,
      uploading,
      isModalOpen,
    } = this.state;

    const isCover = type === 'cover';

    return (
      <div className={cx(styles.profileImage, {[styles.profilePicture]: type === 'picture' })}>

        <Dropzone
            multiple={false}
            className={styles.dropzone}
            prompt={prompt}
            handleConfirmUpload={this.handleSubmit}
            handleCancelUpload={this.toggleModal}
            dialog={{
              msg: "Closing this window will remove your changes. Ok with you?",
              label: `Change the ${isCover ? 'Cover' : 'Picture'}!`
            }}
            uniqueModalOpen={isModalOpen}
            toggleModal={this.toggleModal}
            backgroundImage={ image ? image : null }
          />
      </div>
    )
  }
}

ProfileImage.defaultProps = {
  type: 'cover'
};

ProfileImage.propTypes = {
  image: PropTypes.string,
  prompt: PropTypes.string,
  submitImage: PropTypes.func.isRequired,
  type: PropTypes.oneOf([ 'cover', 'picture', 'profile-photo' ]),
};

const mapStateToProps = (state) => {

  return {
    tmp: state.dropzone.tmp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)