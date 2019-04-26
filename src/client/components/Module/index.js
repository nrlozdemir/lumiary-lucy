import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'
import _ from 'lodash'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'

export class Module extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShow: false,
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.action &&
      !_.isEqual(
        prevProps.selectFilters.values[prevProps.moduleKey],
        this.props.selectFilters.values[this.props.moduleKey]
      )
    ) {
      this.props.action(
        this.props.selectFilters.values[this.props.moduleKey],
        this.props.moduleKey
      )
    }
  }

  changeInfoStatus = () => {
    this.setState({
      infoShow: !this.state.infoShow,
    })
  }

  render() {
    const moduleContainer = cx(
      'shadow-1 grid-container col-12',
      style.moduleContainer
    )
    const referencesClass = cx('font-secondary-second', style.references)

    const {
      children,
      title,
      subTitle,
      legend,
      filters,
      references,
    } = this.props
    const { infoShow } = this.state
    console.log(filters)
    return (
      <div className={moduleContainer}>
        <div className={style.moduleContainerHeader}>
          <HeaderModule
            {...this.props}
            changeInfoStatus={this.changeInfoStatus}
            infoShow={infoShow}
          />
        </div>
        <div className={style.moduleContainerBody}>{children}</div>
        {references && (
          <div className={referencesClass}>
            {references.map((ref, index) => (
              <div className={style.referenceItem} key={index}>
                <span className={ref.className} />
                {ref.text}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
})

Module.propTypes = {
  action: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {}
)(Module)
