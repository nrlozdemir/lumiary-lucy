import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './styles.scss'

class Dropdown extends PureComponent {

  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  setChildNodeRef = (ref) => {
    this.childNode = ref;
  }

  handleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.open) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      open: !this.state.open
    })
  }

  handleOutsideClick = (e) => {
    const isDescendantOfRoot = this.childNode && this.childNode.contains(e.target);

    if (!isDescendantOfRoot) {
      this.setState({
        open: false
      })
    }
  }

  renderButton = () => {
    const {
      buttonLabel,
      buttonClassName,
      arrow,
      arrowClassName
    } = this.props

    const buttonClassNames = cx(styles.dropdownButton, {
      [buttonClassName]: true
    })

    const arrowClassNames = cx(styles.dropdownIcon, {
      [arrowClassNames]: true,
      [styles.closed]: this.state.open
    })

    return (
      <button
        className={ buttonClassNames }
        onClick={ this.handleDropdown }
        ref={ this.setChildNodeRef }
      >
        <span>{ buttonLabel }</span>
        { arrow &&
          <span
            className={ arrowClassNames }
          />
        }
      </button>
    )
  }

  renderCustomButton = (btn) => {
    return (
      <div 
        onClick={ this.handleDropdown }
        ref={ this.setChildNodeRef }
      >
        { btn() }
      </div>
    )
  }

  render() {  
    const { 
      open 
    } = this.state
    const {
      children,
      className,
      renderCustomButton
    } = this.props

    return (
      <div className={ styles.dropdown_container }>
        { renderCustomButton 
            ? this.renderCustomButton(renderCustomButton)
            : this.renderButton() 
        }

        { open &&
          Children.map(children, child => child )
        }
      </div>
    )
  }
}

Dropdown.defaultProps = {
  className: '',
  buttonLabel: '',
  buttonClassName: '',
  arrow: true,
  arrowClassName: '',
  renderCustomButton: null
}

Dropdown.propTypes = {
  className: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonClassName: PropTypes.string,
  arrow: PropTypes.bool,
  arrowClassName: PropTypes.string,
  renderCustomButton: PropTypes.func
}

export default Dropdown
