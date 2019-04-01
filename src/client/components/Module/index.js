import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { actions, makeSelectSelectFilters } from 'Reducers/selectFilters'
import cx from 'classnames'
import style from './style.scss'
import HeaderModule from './header'

export class Module extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectFilters !== this.props.selectFilters) {
      console.log('###', this.props.filters)
      let checkHasOwnData = this.props.filters.filter(
        (item) => this.props.selectFilters.values[item.selectKey]
      )
      if (checkHasOwnData) {
        let handleDataSet = this.props.filters.reduce((a, b) => {
          if (this.props.selectFilters.values[b.selectKey]) {
            a.push(this.props.selectFilters.values[b.selectKey])
          }
          return a
        }, [])
        this.props.action(handleDataSet)
      }
    }
  }

  render() {
    const moduleContainer = cx('shadow-1 col-12', style.moduleContainer)
    const { children, title, subTitle, legend, filters } = this.props
    return (
      <div className={moduleContainer}>
        <div className={style.moduleContainerHeader}>
          <HeaderModule {...this.props} />
        </div>
        <div className={style.moduleContainerBody}>{children}</div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  selectFilters: makeSelectSelectFilters(),
})

export default connect(
  mapStateToProps,
  {}
)(Module)
