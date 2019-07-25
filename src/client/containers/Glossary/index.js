import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'
import LetterBar from './sections/letterBar'
import SideBar from './sections/sideBar'
import MainContentArea from './sections/mainContentArea'

class Glossary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mocks: {
        letters: {
          a: [
            {
              uuid: '123321',
              term: 'Animation',
              description: 'Animation',
              text: '<p>hi</p>',
              tags: [
                {
                  name: 'title',
                },
              ],
            },
            {
              uuid: '123321',
              term: 'Ascpect Ratio',
              description: 'Ascpect Ratio',
              text: '<p>hi</p>',
              tags: [
                {
                  name: 'title',
                },
              ],
            },
          ],
          b: [
            {
              uuid: '12344321',
              term: 'Brand Insights',
              description: 'Brand Insights',
              text: '<p>hi</p>',
              tags: [
                {
                  name: 'title',
                },
              ],
            },
          ],

          c: [
            {
              uuid: '111',
              term: 'Cinemagraph',
              description: 'Cinemagraph',
              text: '<p>hi</p>',
              tags: [
                {
                  name: 'title',
                },
              ],
            },
          ],
        },

        modules: [
          {
            uuid: 'asd',
            title: 'asd',
            identifier: 'key',
            description: 'asd',
            terms: ['111', '12344321'],
          },
        ],
      },
    }
  }

  render() {
    const {
      match: {
        params: { letter, term },
      },
      history,
    } = this.props

    const {
      mocks: { letters },
    } = this.state

    return (
      <div className="grid-container col-12">
        <LetterBar content={letters} />
        <div className={style.glossaryBodyContainer}>
          <SideBar />
          <MainContentArea content={letters[letter]} term={term} />
        </div>
      </div>
    )
  }
}

export default withRouter(Glossary)
