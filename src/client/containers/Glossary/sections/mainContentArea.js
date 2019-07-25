import React, { Component } from 'react'
import { withTheme } from 'ThemeContext/withTheme'
import style from '../style.scss'
import { capitalize } from 'Utils/text'

class MainContentArea extends Component {
  render() {
    const { content, term, letter } = this.props
    const { colors } = this.props.themeContext
    console.log('Main content area page props: ', this.props)

    return (
      <div
        className={style.glossaryMain}
        style={{
          background: colors.moduleBackground,
          color: colors.textColor,
          boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
        }}
      >
        <div className={style.mainContentArea}>
          {(!!term || !!letter) && (
            <div className={style.mainContentHeader}>
              {capitalize(term ? term : letter)}
            </div>
          )}

          {!!content ? (
            !!content.length &&
            content.map((item, index) => {
              return (
                <div
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
          ) : (
            <div className={style.empty}>No Data Available</div>
          )}
        </div>
      </div>
    )
  }
}

export default withTheme(MainContentArea)
