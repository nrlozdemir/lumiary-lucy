import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'
import LetterBar from './sections/letterBar'
import SideBar from './sections/sideBar'
import MainContentArea from './sections/mainContentArea'

class Glossary extends Component {
  render() {
    const { match, history } = this.props
    console.log('Glossary router: ', match)
    console.log('Glossary params: ', match.params)
    return (
      <div className="grid-container col-12">
        <LetterBar />
        <div className={style.glossaryBodyContainer}>
          <SideBar />
          <MainContentArea />
        </div>
      </div>
    )
  }
}

export default withRouter(Glossary)
