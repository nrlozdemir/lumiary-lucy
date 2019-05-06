import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import style from './style.scss'

const ReportsModal = ({
  isClosable,
  width,
  isOpen,
  title,
  onAfterOpen,
  onRequestClose,
  children,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
}) => {
  const customStyles = {
    content: {
      backgroundColor: '#373F5B',
      maxWidth: width,
    },
    overlay: {
      backgroundColor: 'rgba(172, 176, 190, 0.8)',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onAfterOpen={onAfterOpen}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <div className={style.modalHeader}>
        <p className={style.headerTitle}>{title}</p>
        {isClosable && (
          <div className={style.iconWrapper} onClick={() => onRequestClose()}>
            <span className="icon-X-Circle">
              <span className="path1" />
              <span className="path2" />
              <span className="path3" />
            </span>
          </div>
        )}
      </div>
      <div className={style.modalContainer}>{children}</div>
    </Modal>
  )
}

ReportsModal.defaultProps = {
  ariaHideApp: true,
  title: 'Custom Modal',
  isClosable: false,
}

ReportsModal.propTypes = {
  isOpen: PropTypes.bool,
  ariaHideApp: PropTypes.bool,
}

export default ReportsModal
