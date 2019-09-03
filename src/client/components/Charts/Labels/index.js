import React from 'react'
//import PropTypes from "prop-types"
import classnames from 'classnames'
import style from './style.scss'

const propTypes = {}
const defaultProps = {}

export default class Labels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data, removeMargin } = this.props

    // console.log('label props', this.props)

    return (
      <React.Fragment>
        {data.map((roundData, index) => (
          <div
            className={classnames(
              'd-flex',
              'align-items-center',
              style.labels,
              {
                [style.removeMargin]: !!removeMargin && removeMargin === true,
              }
            )}
            key={index}
          >
            <span
              className={style.round}
              style={{ backgroundColor: `${roundData.color}` }}
            />
            <span className={style.secondsText}>{roundData.data}</span>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

Labels.propTypes = propTypes
Labels.defaultProps = defaultProps
