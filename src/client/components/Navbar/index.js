import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { makeSelectLibrary } from 'Reducers/library'
import Switch from 'Components/Form/Switch'
import { capitalizeFirstLetter } from 'Utils/index'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
// import PropTypes from 'prop-types';

const containerClass = classnames(
  'grid-container bg-dark-grey-blue ' + style.container
)
const linksClass = classnames(style.links)
const profileClass = classnames(style.profile)
const imageClass = classnames('circleImage ' + style.profileImage)

const BackTo = (props) => {
  let link,
    title = ''

  if (typeof props != 'undefined' && props[1] != null) {
    title = props[1]
    link = '/' + props[1]
  } else {
    title = 'overview'
    link = '/'
  }
  title = 'Back to ' + capitalizeFirstLetter(title)

  if (props && props.title) {
    title = capitalizeFirstLetter(props.title)
  }

  return (
    <div className={style.backTo}>
      <Link to={link}>
        <span className="icon-Left-Arrow-Circle">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
        </span>
        <span className={style.text}>{title}</span>
      </Link>
    </div>
  )
}

const Logo = ({ themes }) => (
  <div className={style.logo}>
    <Link to="/" style={{ color: themes.textColor }}>
      Lumiere
    </Link>
  </div>
)

const Default = (props) => {
  const { textColor, moduleBackground } = props.themes
  return Object.values(props)
    .filter(
      (r) => r.navigation && r.navigation.level == 1 && r.navigation.order > 0
    )
    .sort((a, b) =>
      a.navigation.order > b.navigation.order
        ? 1
        : b.navigation.order > a.navigation.order
        ? -1
        : 0
    )
    .map((el, i) => (
      <NavLink
        key={i}
        to={el.path}
        activeClassName={style.activeLink}
        style={{ color: textColor }}
      >
        {el.navigation.title}
      </NavLink>
    ))
}

const SelectedNavLink = (props) => {
  return (
    <React.Fragment>
      <div>{capitalizeFirstLetter(props.title)}</div>
      {props.load && (
        <div className={style.switchInner}>
          <span>Save Report</span>
          <Switch />
        </div>
      )}
    </React.Fragment>
  )
}

const NavTitle = (props) => {
  const {
    match,
    library: { videos },
  } = props

  if (videos && match) {
    const video =
      videos.find(({ id }) => id == Object.values(match.params)[0]) || {}
    const title = video.title
    return <div>{title && capitalizeFirstLetter(title)}</div>
  }
}

const SubNavigation = (props) => {
  const { textColor, moduleBackground } = props.themes
  return Object.values(props)
    .filter(
      (r) => r.navigation && r.navigation.level == 2 && r.navigation.order > 0
    )
    .sort((a, b) =>
      a.navigation.order > b.navigation.order
        ? 1
        : b.navigation.order > a.navigation.order
        ? -1
        : 0
    )
    .map((el, i) => (
      <NavLink
        key={i}
        to={el.path}
        className={style.tab}
        style={{ color: textColor }}
        activeClassName={classnames(style.tab, style.activeLink)}
      >
        {el.navigation.title}
      </NavLink>
    ))
}

const Selector = (props) => {
  const url = props && props.match.url.split('/')
  const navigation = props && props.routeConfig

  const navigationPathMatch = Object.values(navigation).filter(
    (r) =>
      r.path == props.match.path &&
      r.navigation &&
      r.navigation.type &&
      r.navigation.type == 'makeTitle'
  )

  const navigationSubRoutes = Object.values(navigation)
    .filter((r) => r.path.replace('/', '') == url[1])
    .filter(
      (r) =>
        r.navigation &&
        r.navigation.level == 1 &&
        r.navigation.order > 0 &&
        r.routes &&
        r.routes.length > 0
    )

  const navigationSubRoutesMatch =
    navigationSubRoutes &&
    navigationSubRoutes[0] &&
    navigationSubRoutes[0].routes
      .map((el, i) => el)
      .filter((r) => r.path == url.join('/'))

  if (navigationPathMatch && navigationPathMatch.length > 0) {
    const { from, loadComponent } = navigationPathMatch[0].navigation
    let title = navigationPathMatch[0].navigation.title
    let backToTitle

    if (from !== null) {
      title = props.match.params[from].replace('-', ' ')
    }
    if (navigationPathMatch[0].navigation.backToTitle) {
      backToTitle = navigationPathMatch[0].navigation.backToTitle
    }

    return {
      leftSide: <BackTo {...url} title={backToTitle} />,
      navigation: <SelectedNavLink title={title} load={loadComponent} />,
    }
  } else if (navigationSubRoutesMatch && navigationSubRoutesMatch.length > 0) {
    return {
      leftSide: <BackTo {...url} />,
      navigation: (
        <SelectedNavLink title={navigationSubRoutesMatch[0].navigation.title} />
      ),
    }
  } else if (navigationSubRoutes && navigationSubRoutes.length > 0) {
    return {
      leftSide: <BackTo />,
      navigation: <SubNavigation {...navigationSubRoutes[0].routes} />,
    }
  } else if (url[1] == 'library' && url[2] && url[2].match(/(\d+)/gm)) {
    return {
      leftSide: <BackTo {...url} />,
      navigation: <NavTitle {...props} />,
    }
  } else {
    return {
      leftSide: <Logo themes={props.themes} />,
      navigation: <Default {...navigation} themes={props.themes} />,
    }
  }
}

const Template = (props) => {
  const templateSelector = Selector(props)
  const { textColor, moduleBackground } = props.themes
  const { switchOn, controlSwitch } = props
  return (
    <div
      className={containerClass}
      style={{ color: textColor, background: moduleBackground }}
    >
      {templateSelector['leftSide']}
      <div className={linksClass}>{templateSelector['navigation']}</div>
      <div className={profileClass}>
        <div className="float-right">
          <img
            src="https://picsum.photos/id/836/30/30"
            className={imageClass}
          />
          <Switch switchOn={switchOn} controlSwitch={controlSwitch} />
        </div>
      </div>
    </div>
  )
}

/* eslint-disable react/prefer-stateless-function */
class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      switchOn: false,
    }
  }

  controlSwitch = () => {
    this.setState(
      {
        switchOn: !this.state.switchOn,
      },
      () => {
        console.log('switchOn', this.state.switchOn)
        this.props.themeContext.setColor(this.state.switchOn ? 'light' : 'dark')
      }
    )
  }

  render() {
    console.log('STATE', this.state.switchOn)
    return (
      <React.Fragment>
        <Template
          {...this.props}
          themes={this.props.themeContext.colors}
          switchOn={this.state.switchOn}
          controlSwitch={this.controlSwitch}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
})

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Navbar)
