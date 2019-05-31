import React from 'react'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import PointerCard from 'Components/PointerCard'

class BasedOnShares extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.panelChart}
            style={{ borderColor: colors.moduleBorder }}
          >
            <PointerCard
              data={{
                topTitle: 'Based on Shares',
                pointerData: 140,
                bottomText: 'of your library is shot in',
                avg: 103,
                percent: 16,
                fps: 24,
              }}
              colors={colors}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default BasedOnShares
