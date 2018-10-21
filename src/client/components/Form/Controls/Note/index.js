import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

class Note extends React.Component {

  handleKeyPress = (e) => {
    const { handleAdd, input } = this.props
    if(e.key === 'Enter') {
      e.preventDefault()
      handleAdd(input)
    }
  }

  render() {

    const {
      id, className, label, input, placeholder, type, maxLength,
      meta: { asyncValidating, touched, warning, error} ,
      handleAdd, counterClass, onKeyPress

    } = this.props

    const classNames = classnames({
      asyncValidating: asyncValidating,
      valid: touched && !error,
      [style.invalid]: touched && error
    })


    const counterClasses = classnames(
      style.counter,
      style[counterClass]
    )

    return (
      <div className={ classNames } >
        <input { ...input } onKeyPress={ this.handleKeyPress } id={ id } className={ style.main } placeholder={ placeholder } type={ type } />
        { touched &&
          (
            ( error && <span className={ style.error }> { error } </span> ) ||
            ( warning && <span className="warning"> { warning } </span> )
          )
        }

        { maxLength ?
          <span className={ counterClasses }>{input.value.length || 0 }/{maxLength}</span>
          : null
        }

        <a className={ style.addButton} onClick={ (val) => handleAdd(input) }/>

      </div>

    )
  }
}

Note.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  handleAdd: PropTypes.func
}

Note.defaultProps = {
  handleAdd: () => {}
}

export default Note



















