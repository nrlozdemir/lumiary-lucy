import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import cx from 'classnames'
import { staticUrl, mediaUrl } from 'Utils/globals'
// Style
import style from './styles.scss'


class Header extends PureComponent {

  render() {

    return (
      <div>header</div>
    )
  }
}

Header.propTypes = {
};

Header.defaultProps = {
};

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

