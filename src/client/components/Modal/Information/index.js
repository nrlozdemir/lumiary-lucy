import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import XCircle from 'Components/Icons/XCircle'
import Button from 'Components/Form/Button'
import RouterLoading from 'Components/RouterLoading'

const InformationModal = ({
  width,
  isOpen,
  onRequestClose,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  themeContext,
  options: { data, loading },
  onAfterOpen,
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
      onAfterOpen={onAfterOpen}
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
          {data ? (
            data.map((item, key) => (
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
            ))
          ) : loading ? (
            <RouterLoading />
          ) : (
            <div className={style.empty}>No Data Available</div>
          )}
        </div>
      </div>
    </Modal>
  )
}

InformationModal.propTypes = {
  isOpen: PropTypes.bool,
}

export default withTheme(InformationModal)
