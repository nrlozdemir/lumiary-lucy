import React from 'react'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { actions } from 'Reducers/app'
import { breakpoints as configBreakpoints } from 'Utils/globals'
import * as Sentry from '@sentry/browser';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    const {
      history,
      isMobile,
      setCurrentUrl,
      requestConfig
    } = this.props;

    // Set Location then listen for location change and update redux store.
    setCurrentUrl((history.getCurrentLocation()).pathname)

    this.urlChange = browserHistory.listen(location => {
      // console.log(location.pathname)
      setCurrentUrl(location.pathname)
    })

    // Update breakpoints in redux store when window is resized
    this.setBreakpoints()

    if(typeof window != 'undefined'){
      this.breakpointChange = window.addEventListener("resize", debounce(this.setBreakpoints, 100), false)

      // Set isMobile in redux store
      const NUA = window.navigator.userAgent.toLowerCase()

      if (
        typeof window.orientation !== "undefined" &&
        typeof window.ontouchstart !== "undefined" &&
        (
          NUA.indexOf('iphone') > -1 ||
          NUA.indexOf('ipad') > -1 ||
          NUA.indexOf('android') > -1
        )
      ) {
        isMobile(true);
      } else {
        isMobile(false);
      }
    }

    // Request config
    requestConfig();

    //Sentry config
    Sentry.init({ dsn: 'https://7c84f757a92c4dfda093a5245466f438@sentry.io/1283404' });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  setBreakpoints = () => {
    const widthIs = window.innerWidth;

    // configBreakpoints values set and imported from webpack config file
    const breakpoints = {
      xSmallDown: widthIs < configBreakpoints.xsmall,
      xSmallUp: widthIs >= configBreakpoints.xsmall,
      xSmall: widthIs >= configBreakpoints.xsmall && widthIs < configBreakpoints.small,

      smallDown: widthIs < configBreakpoints.small,
      smallUp: widthIs >= configBreakpoints.small,
      small: widthIs >= configBreakpoints.small && widthIs < configBreakpoints.medium,

      mediumDown: widthIs < configBreakpoints.medium,
      mediumUp: widthIs >= configBreakpoints.medium,
      medium: widthIs >= configBreakpoints.medium && widthIs < configBreakpoints.large,

      largeDown: widthIs < configBreakpoints.large,
      largeUp: widthIs >= configBreakpoints.large,
      large: widthIs >= configBreakpoints.large && widthIs < configBreakpoints.xlarge,

      xLargeDown: widthIs < configBreakpoints.xlarge,
      xLargeUp: widthIs >= configBreakpoints.xlarge,
      xLarge: widthIs >= configBreakpoints.xlarge && widthIs < configBreakpoints.slarge,

      sLargeDown: widthIs < configBreakpoints.slarge,
      sLargeUp: widthIs >= configBreakpoints.slarge,
      sLarge: widthIs >= configBreakpoints.slarge
    }

    // console.log("widthIs: ", widthIs, "\nbreakpoints: ", breakpoints);

    this.props.setBreakpoints(breakpoints);
  }

  shouldComponentUpdate(){
    return false
  }

  render() {
    const { routes, store, history } = this.props;

    return (
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} routes={routes} history={history} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
}

const mapStateToProps = (state) => ({
  app: state.app
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
