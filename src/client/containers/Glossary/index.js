import React, { Component } from 'react'
import LetterBar from './sections/letterBar'
import SideBar from './sections/sideBar'
import MainContentArea from './sections/mainContentArea'

class Glossary extends Component {
  render() {
    return (
      <div className="grid-container col-12">
        <LetterBar />
        <SideBar />
        <MainContentArea />
      </div>
    )
  }
}

export default Glossary
