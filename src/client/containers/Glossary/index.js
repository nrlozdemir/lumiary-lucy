import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.scss'
import Letterbar from './sections/letterbar'
import Sidebar from './sections/sidebar'
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
              text:
                '<p>Nullam quis risus eget urna mollis ornare vel eu leo. Brand Insights non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Donec sed odio dui.  Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>',
              tags: [
                {
                  name: 'Property',
                },
                {
                  name: 'Metric',
                },
              ],
            },
            {
              uuid: '123321',
              term: 'Ascpect Ratio',
              description: 'Ascpect Ratio',
              text:
                '<p>Nullam quis risus eget urna mollis ornare vel eu leo. Brand Insights non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Donec sed odio dui.  Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>',
              tags: [
                {
                  name: 'format',
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
        <Letterbar content={letters} />
        <div className={style.glossaryBodyContainer}>
          <Sidebar letter={letter} content={letters} term={term} />
          <MainContentArea
            content={letters[letter]}
            term={term}
            letter={letter}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Glossary)
