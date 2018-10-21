import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import style from './styles.scss'

class Settings extends React.Component {

  handleModal = () => {
    const { toggleModal } = this.props
    toggleModal()
  }

  render(){
    const { children, isOpen } = this.props

    return(
      <Modal
        className={ style.smallModalInnerContent }
        ariaHideApp={false}
        isOpen={ isOpen }
        overlayClassName={ style.smallModalOverlay }
      >
        <div className={ style.scrollableModalContent }>
          <div className={ style.scrollableModalBody }>
            <div className={ style.smallModal }>
              <a className={ style.smallModalClose } onClick={ this.handleModal } />
            { children }
            </div>
          </div>
        </div>

      </Modal>
    )
  }
}

export default Settings