import React from 'react'
import ReactDOM from 'react-dom'
import style from './styles.scss'
import cx from 'classnames'
import { Change } from 'slate'
import PropTypes from 'prop-types'
import { isEqual, find } from 'lodash'
import { isSelectionMarked, hasMark } from './index'

const MARK_TYPE = 'visual'

const valueMatchesVisual = (value, visuals) => {
  const { start, end } = value.selection
  const key = value.focusText.key

  return find(visuals, (visual) => {
    return (
      visual.key == key &&
      visual.start == start.offset &&
      visual.end == end.offset
    )
  })
}

const AddMenu = props => {
  const classNames = cx(
      [style.hoverMenu],
      [style.addMenu]
  )
  const { menuRef, handleMouseDown } = props
  return(
    <div className={ classNames } ref={ menuRef } onMouseDown={ handleMouseDown }>
      <span
        className= { style.button }
        data-active={ false }
      >
      Add visual

      </span>
    </div>

  )
}

const EditMenu = props => {
  const classNames = cx(
      [style.hoverMenu],
      [style.editMenu]
  )
  const { menuRef, handleMouseDown, visuals, value } = props
    
  const detail = valueMatchesVisual(value, visuals) || {}
  
  if(!detail.description) { 
    return null
  }

  const description = detail.description.length >= 200 ? `${detail.description.substring(0, 200)}&hellip;`: detail.description

  return(
    <div className={ classNames } ref={ menuRef }>
      <div className={ style.tools }>
        <div onClick={ handleMouseDown } className={ style.delete } />
      </div>

      <div className={ style.visual }>
        <div className={ style.viz } style={{backgroundImage: `url(${ detail.url })`}} />
        <div
          className={ style.description }
          dangerouslySetInnerHTML={{ __html: `${ description }` }} />
      </div>
    </div>
  )
}
/*
He looks ready for anything. I want to see how this looks if i hit max characters, what do you think will happen? I want to see how this looks if i hit max characters, what do you think will happen? I want to see how this looks if i hit max char lim.
*/
class Menu extends React.Component {

  handleMouseDown = (event) => {
    const { handleMark, value } = this.props
    const marked  = hasMark(value, 'visual')
    const text    = value.fragment.text
    handleMark(text, marked)
  }

  render() {
    const { menuRef, visuals, value, onChange } = this.props
    const marked = isSelectionMarked(value, 'visual')

    if(!marked){
      return ReactDOM.createPortal(
        <AddMenu menuRef={ menuRef } handleMouseDown={ this.handleMouseDown } />,
         window.document.getElementById('app')
      )
    } else {
      return ReactDOM.createPortal(
        <EditMenu value={ value } visuals={ visuals } menuRef={ menuRef } handleMouseDown={ this.handleMouseDown } />,
         window.document.getElementById('app')
      )
    }
  }
}

Menu.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  handleMark: PropTypes.func,
  visuals: PropTypes.array,
  modalOpen: PropTypes.bool
}

export default Menu
