import React, { Component } from 'react'
import { withTheme } from 'ThemeContext/withTheme'
import style from '../style.scss'
import { capitalize } from 'Utils/text'

class MainContentArea extends Component {
  constructor(props) {
    super(props)
    this.contentRef = []
  }

  componentDidMount() {
    this.scrollToElement()
  }

  scrollToElement() {
    const { term } = this.props
    const selectedElem = this.contentRef[`content-${term}`]

    if (!!term && !!selectedElem) {
      let topPos = selectedElem.offsetTop

      //calculate the letter bar height
      const letterBarElement = document.getElementById('glossaryLetterBar')
      if (letterBarElement && letterBarElement.clientHeight) {
        topPos += letterBarElement.clientHeight
      }

      window.scrollTo(0, topPos)
    }
  }

  renderContentItems(content, refActive) {
    const { colors } = this.props.themeContext

    return content.map((item, index) => {
      return (
        <div
          {...(refActive
            ? {
                ref: (contentRef) => {
                  this.contentRef[`content-${item.slug}`] = contentRef
                },
              }
            : {})}
          id={`content-${item.slug}`}
          className={style.mainContentItem}
          key={`mainContentItem-${index}`}
        >
          {!!item.term && (
            <h3 className={style.mainContentItemTerm}>{item.term}</h3>
          )}
          {!!item.tags && !!item.tags.length && (
            <ul className={style.mainContentItemTags}>
              {item.tags.map((tag, idx) => (
                <li
                  key={`tags-${idx}`}
                  style={{
                    borderColor: `${colors.moduleBorder}`,
                  }}
                  className={style.mainContentItemTag}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
          {!!item.text && (
            <div
              className={style.mainContentItemContent}
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          )}
        </div>
      )
    })
  }

  render() {
    const { content, menu, letter } = this.props
    const { colors } = this.props.themeContext

    // ;(letter ? (menu ? content : content[letter]) : content).sort((a, b) =>
    //   a.slug > b.slug ? 1 : a.slug < b.slug ? -1 : 0
    // )    

    return (
      <div
        id="glossaryMain"
        className={style.glossaryMain}
        style={{
          background: colors.moduleBackground,
          color: colors.textColor,
          boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
        }}
      >
        <style>
          {`
            .${style.mainContentItemContent} a {
              color: ${colors.glossaryLinkColor} !important;
            }
          `}
        </style>
        <div className={style.mainContentArea}>
          {(!!menu || !!letter) && (
            <div className={style.mainContentHeader}>
              {capitalize(menu ? menu : letter)}
            </div>
          )}
          {letter
            ? this.renderContentItems(menu ? content : content[letter], true)
            : Object.keys(content).map((key) => {
                this.renderContentItems(content[key], false)
              })}
        </div>
      </div>
    )
  }
}

export default withTheme(MainContentArea)
