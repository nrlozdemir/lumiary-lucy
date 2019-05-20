import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import XCircle from "Components/Icons/XCircle";

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
	themeContext,
}) => {
	const themes = themeContext.colors
	const customStyles = {
		content: {
			backgroundColor: themes.modalBackground,
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
			<div
				className={style.modalHeader}
				style={{
					background: themes.modalHeaderBackground,
				}}
			>
				<p
					className={style.headerTitle}
					style={{
						color: themes.modalHeaderColor,
					}}
				>
					{title}
				</p>
				{isClosable && (
					<div className={style.iconWrapper} onClick={() => onRequestClose()}>
						<XCircle></XCircle>
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

export default withTheme(ReportsModal)
