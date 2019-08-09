import React, { Component } from 'react'
import { withTheme } from 'ThemeContext/withTheme'
import style from '../style.scss'
import { capitalize } from 'Utils/text'

class MainContentArea extends Component {
  constructor(props) {
    super(props)
    this.contentRef = []
  }
  scrollToElement() {
    const { term } = this.props
    const selectedElem = this.contentRef[`content-${term}`]
    
    if(!!term && !!selectedElem) {
      let topPos = selectedElem.offsetTop

      //calculate the letter bar height
      const letterBarElement = document.getElementById('glossaryLetterBar')
      if(letterBarElement && letterBarElement.clientHeight) {
        topPos += letterBarElement.clientHeight
      }
      window.scrollTo(0, topPos)
    }
  }
  componentDidMount() {
    this.scrollToElement()
  }
  componentDidUpdate() {
    this.scrollToElement()
  }
  render() {
    const { content, menu, letter } = this.props
    const { colors } = this.props.themeContext
    return (
      <div
        id='glossaryMain'
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
            ? 
            [...(menu ? content : content[letter])].map((item, index) => {
                return (
                  <div
                    id={`content-${item.slug}`}
                    ref={contentRef => this.contentRef[`content-${item.slug}`] = contentRef}
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
            : Object.keys(content).map((key) =>
                content[key].map((item, index) => (
                  <div
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
                ))
              )}
        </div>
      </div>
    )
  }
}

export default withTheme(MainContentArea)
