import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import XCircle from 'Components/Icons/XCircle'
import { Link } from 'react-router-dom'
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

  // term with module tag first
  const sortedData =
    !!data && !!data.length
      ? data.sort((x, y) =>
          !!x.tags &&
          !!x.tags.length &&
          x.tags.some((tag) => tag.name === 'Module')
            ? -1
            : 0
        )
      : []

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
          {!!sortedData.length ? (
            sortedData.map((item, key) => (
              <div key={key} className={style.item}>
                <div className={style.header}>
                  <div className={style.title}>{item.term}</div>
                  <Link
                    to={`/glossary/${item.letter}/${item.slug}`}
                    className={style.button}
                    style={{
                      backgroundColor: themes.moduleBackground,
                      color: themes.labelColor,
                    }}
                  >
                    View in Glossary
                  </Link>
                </div>
                <div
                  className={style.content}
                  dangerouslySetInnerHTML={{ __html: item.text }}
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
