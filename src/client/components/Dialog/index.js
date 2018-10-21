import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import style from './styles.scss'
import { confirmAlert, removeElementReconfirm } from 'react-confirm-alert'
import { render, unmountComponentAtNode } from 'react-dom'
import cx from 'classnames'

class Dialog extends PureComponent {
  handleModal = () => {
    const { toggleModal, confirmAlert } = this.props

    // console.log(confirmAlert)
    confirmAlert ? this.confirm() : toggleModal()

  }

  cancel = () => {
    const target = document.getElementById('react-confirm-alert')
    unmountComponentAtNode(target)
    target.parentNode.removeChild(target)
  }

  confirm = () => {
    const { toggleModal, confirmProps: {
        msg,
        confirmLabel,
        handleConfirm,
        children,
        belowButtons,
        cancelLabel
      }
    } = this.props

    // console.log(cancelLabel)

    confirmAlert({
      title: '',
      message: msg,
      confirmLabel: confirmLabel,
      onConfirm: handleConfirm,
      cancelLabel: '',
      belowButtons: () => <a className="cancel-alert" onClick={ this.cancel }>{cancelLabel}</a>

    })
  }

  render(){
    const {
      className, overlayClassName, scrollableClassName,
      children, isOpen,
      closeClassName, closeButton,
      handleClose,
      extraClasses,
      closeButtonClassName
    } = this.props

    const classNames = cx(
      style[scrollableClassName],
      style.scrollableModalBody,
      style[className],
      extraClasses
    )

    return(
      <Modal
        className={ style.smallModalInnerContent }
        ariaHideApp={false}
        isOpen={ isOpen }
        overlayClassName={ style[overlayClassName] || style.smallModalOverlay }
				onRequestClose={ this.handleModal }
      >
        <div className={ style.scrollableModalContent }>
          <div className={ classNames }>
            <div className={ style.smallModal }>
            { closeButton && <a className={ cx(style.smallModalClose, closeButtonClassName) } onClick={ this.handleModal } /> }
            { children }
            </div>
          </div>
        </div>

      </Modal>
    )
  }
}

export default Dialog
