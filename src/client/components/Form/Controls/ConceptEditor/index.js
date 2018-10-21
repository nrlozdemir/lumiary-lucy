import React from 'react'
import { Editor } from 'slate-react'
import { Value, Selection } from 'slate'
import style from './styles.scss'
import Menu from './menu'
import { randomString } from 'Utils/'
import PropTypes from 'prop-types'
import { isEqual, times, find } from 'lodash'

export const hasMark = (value, type, selection = null) => {
  let hasMark = false
  let range = selection ? selection : value.selection
  try {
    hasMark = value.document
      .getMarksAtRange(range)
      .some(mark => mark.type === type)
  } catch(err) {

  }
  return hasMark
}

export const isSelectionMarked = (value, type) => {
  return value.activeMarks.some((mark) => mark.type == type)
}

const Mark = props => {
  const { attributes, children, handleClick } = props
  return (
    <div className={ style.marked } id={`marked-${randomString(8)}`} {...attributes}>
      {children}
    </div>
  )
}

class ConceptEditor extends React.Component {

  componentDidUpdate = (prevProps) => {
    const { blurEditor, value } = this.props
    if(blurEditor){
      //console.log('blur')
      this.editor.blur()
    }
  }

  maybeOpenMenu = () => {
    const { value } = this.props
    const menu = this.menu
    if(!menu) return

    if (!value.fragment.text.length) {
      menu.removeAttribute('style')
      return
    }

    const range     = window.getSelection().getRangeAt(0)
    const rect      = range.getBoundingClientRect()
    const left      = rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2
    const top       = rect.top + window.pageYOffset - menu.offsetHeight - 5

    menu.style.opacity  = 1
    menu.style.top      = `${top}px`
    menu.style.left     = `${left}px`
  }

  /* 
    this solution checks to see if the next two chars are marked
    if they are, then we are in a valid mark zone
    else we remove the mark, so the user can type unmarked stuff
  */
  shouldUnmark = (change) => {
    let ch = change
    let steps = 2
    let shouldUnmark = true

    const { 
      focusText,
      selection: {
        anchor: { key }, 
        start, 
        end
      }
    } = ch.value

    const isEndOfText = focusText ? (end.offset === focusText.text.length) : false

    if(!isEndOfText) {
      times(steps, (idx) => {
        let selection = Selection.create({
          anchor: {
            key,
            offset: start.offset
          },
          focus: {
            key,
            offset: (end.offset + (idx + 1))
          }
        })
        const isMarked = hasMark(ch.value, 'visual', selection)

        if(isMarked) {
          shouldUnmark = false
        }
      })
    }

    // console.log('Should Unmark? === ', shouldUnmark)

    return shouldUnmark
  }

  onChange = (change) => {
    let unmark = (change.value.fragment.text.length > 0) ? change 
      : change.value.change().removeMark('visual') 

    const shouldUnmark = this.shouldUnmark(change)
    
    const newChange = shouldUnmark ? unmark : change
    this.update(newChange)
    this.maybeOpenMenu()
  }

  menuRef = menu => {
    this.menu = menu
  }

  renderMark = props => {
    const { children, mark, attributes, handleMark } = props
    switch (mark.type) {
      case 'visual':
        return <Mark attributes={ attributes } children={ children } />
    }
  }

  update = ({ value }) => {
    const { handleChange } = this.props
    handleChange({ value })
  }

  render(){
    const { 
      value, 
      handleMark, 
      visuals
    } = this.props

    const marked = value ? hasMark(value, 'visual') : false

    if(!value){
      return null
    }

    //console.log(visuals)
    
    //console.log(value.fragment.text, ' IS MARKED', marked)

    return(
      <div>
        <Menu
          ref={ c => this.addMenu = c }
          menuRef={ this.menuRef }
          value={ value }
          onChange={ this.update }
          handleMark={ handleMark }
          visuals={ visuals }
        />

        <Editor
          ref={(i) => this.editor = i }
          className={ style.editor }
          value={ value }
          onChange={ this.onChange }
          renderMark={ this.renderMark }
          placeholder="A man walks into a bar..."
        />
      </div>
    )
  }
}

ConceptEditor.propTypes = {
  initialValue: PropTypes.object,
  handleMark: PropTypes.func,
  handleChange: PropTypes.func,
  blurEditor: PropTypes.bool,
  value: PropTypes.object,
  visuals: PropTypes.array
}

ConceptEditor.defaultProps = {
  handleChange: () => {},
  blurEditor: false
}

export default ConceptEditor
