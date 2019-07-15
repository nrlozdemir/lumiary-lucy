import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import XCircle from 'Components/Icons/XCircle'
import Button from 'Components/Form/Button'

const InformationModal = ({
  isClosable,
  width,
  isOpen,
  onRequestClose,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  themeContext,
  data,
}) => {
  const themes = themeContext.colors
  const customStyles = {
    content: {
      backgroundColor: themes.modalBackground,
      maxWidth: width,
      overlfow: 'visible',
    },
    overlay: {
      backgroundColor: 'rgba(172, 176, 190, 0.8)',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={() => onRequestClose()}
      shouldCloseOnEsc={shouldCloseOnEsc}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <div className={style.iconWrapper} onClick={() => onRequestClose()}>
        <XCircle />
      </div>
      <div
        className={style.modalContainer}
        style={{
          backgroundColor: themes.informationModalBackgroundColor,
        }}
      >
        <div className={style.modalContent}>
          {data.map((item, key) => (
            <div key={key} className={style.item}>
              <div className={style.header}>
                <div className={style.title}>{item.title}</div>
                <Button
                  buttonText="View in Glossary"
                  customClass={style.button}
                />
              </div>
              <div className={style.image}>
                {item.type === 'image' ? (
                  <img src={item.asset} />
                ) : (
                  <video src={item.asset} controls />
                )}
              </div>
              <div
                className={style.content}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

InformationModal.propTypes = {
  isOpen: PropTypes.bool,
}

export default withTheme(InformationModal)
