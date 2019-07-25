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

          c: [],
          d: [
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
          e: [
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
          f: [
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
          g: [
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
          h: [],
          i: [
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
          j: [
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
          k: [
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
          l: [],
          m: [
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
          n: [
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
          o: [
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
          p: [
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
          q: [],
          r: [
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
          s: [
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
          t: [
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
          u: [
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
          v: [
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
          w: [
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
          x: [
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
          y: [
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
          z: [
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
          <SideBar letter={letter} content={letters} term={term}/>
          <MainContentArea content={letters[letter]} term={term} />
        </div>
      </div>
    )
  }
}

export default withRouter(Glossary)
