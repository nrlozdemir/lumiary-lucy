import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import style from './styles.scss'

class Range extends React.Component {
  componentDidMount = () => {
    this.setBubble(0)
  }

  componentWillUpdate = () => {
    this.setBubble()
  }

  setBubble = (val) => {
    const { input } = this.props
    const n       = ReactDOM.findDOMNode(this.input)
    const value   = val || parseInt(input.value)
    const percent = value / 100
    const left    = percent * n.clientWidth + n.offsetLeft - value

    this.bubble.style.left = left + 18
  }

  render() {
    const {
      className, label, input, handleChange
    } = this.props

    return (
      <div className={ style.rangeWrapper }>
      <input
        ref={ c => this.input = c }
        { ...input }
        className={ className }
        type="range" min={0} max={100}
      />

      <div ref={ c => this.bubble = c } className={ style.bubble }>{ input.value || 0 }s</div>
      </div>
    )
  }
}


export default Range
