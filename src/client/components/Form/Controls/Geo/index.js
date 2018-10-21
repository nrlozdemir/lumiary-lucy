import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'Reducers/app'

import style from './styles.scss'

class Geo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGeoRequested: false
    };
  }

  getGeo = () => {
    const { requestPosition, app, input } = this.props
    if (app.location.success) {
      input.onChange(app.location.location);
    } else {
      this.setState({
        isGeoRequested: true,
      }, () => requestPosition())
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { app, input } = nextProps
    const { isGeoRequested } = this.state
    if (isGeoRequested && app.location.success) {
      this.setState({
        isGeoRequested: false
      }, () => {
        input.onChange(app.location.location)
      })
    }
  }

  render() {

    const {
      id, className, label, input, placeholder, type,
      meta: { asyncValidating, touched, warning, error},
      app: { address },
      handleGeo, designType
    } = this.props

    const classNames = classnames(style.geoWrapper, {
      asyncValidating: asyncValidating,
      valid: touched && !error,
      invalid: touched && error,
      [style.creator]: designType === 'creator',
    });

    return (
      <div className={ classNames } >
        <input
          {...input}
          id={id}
          className={className}
          placeholder={placeholder}
          type={type}
        />
        { touched &&
          (
            ( error && <span className="error"> { error } </span> ) ||
            ( warning && <span className="warning"> { warning } </span> )
          )
        }

        <a className={ style.geo } onClick={ this.getGeo }/>

      </div>

    )
  }
}

Geo.defaultProps = {
  designType: 'brand',
};

Geo.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  designType: PropTypes.string,
}


const mapStateToProps = (state) => ({
    app: state.app
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

Geo = connect(mapStateToProps, mapDispatchToProps )(Geo)

export default Geo



















