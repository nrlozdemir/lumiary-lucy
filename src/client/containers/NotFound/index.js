import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'Components/Form/Button'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'

const NotFound = ({ history, themeContext: { colors } }) => {
  return (
    <div className="grid-container col-12 text-center mt-80">
      <h1 className={style.infoText} style={{ color: colors.textColor }}>
        404: Not Found Page
      </h1>
      <Button buttonText="Go Home" onClick={() => history.push('/')} />
    </div>
  )
}

export default withRouter(withTheme(NotFound))
