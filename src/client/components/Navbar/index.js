import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import { makeSelectLibraryDetail } from 'Reducers/libraryDetail'

import {
  actions as reportsActions,
  makeSelectReportsBrandInsightValues,
  makeSelectReportsComparebrandValues,
  makeSelectReportsPredefinedReportValues,
} from 'Reducers/reports'

import { actions as generatedReportActions } from 'Reducers/generatedReport'

import { makeSelectAuthProfile } from 'Reducers/auth'

import Switch from 'Components/Form/Switch'
import { ucfirst } from 'Utils'
import style from './style.scss'
import { withTheme } from 'ThemeContext/withTheme'
import Dropdown from './dropdown'
import LeftArrowCircle from 'Components/Icons/LeftArrowCircle'
// import PropTypes from 'prop-types';

const containerClass = classnames('grid-container ' + style.container)
const linksClass = classnames(style.links)
const profileClass = classnames(style.profile)

const BackTo = (props) => {
  const { textColor } = props.themes
  let link,
    title = ''

  if (typeof props != 'undefined' && props[1] != null) {
    title = props[1]
    link = '/' + props[1]
  } else {
    title = 'overview'
    link = '/'
  }

  if (props && props.title) {
    title = ucfirst(props.title)
  }

  title = 'Back to ' + ucfirst(title)

  return (
    <div className={style.backTo}>
      <Link to={link} style={{ color: textColor }}>
        <LeftArrowCircle />
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
      <div>{ucfirst(props.title)}</div>
      {props.load && (
        <div className={style.switchInner}>
          <span>Save Report</span>
          <Switch
            id={'saveReport'}
            switchOn={props.swicthControl}
            controlSwitch={() => props.swicthChange(props.category)}
          />
        </div>
      )}
    </React.Fragment>
  )
}

const NavTitle = (props) => {
  const {
    match,
    libraryDetail: { selectedVideo },
  } = props
  if (selectedVideo && selectedVideo.title) {
    return <div>{ucfirst(selectedVideo.title)}</div>
  }
  return null
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
  const orginalUrl = props && props.match.url
  const url = props && props.match.url.split('/')
  const navigation = props && props.routeConfig
  const state = props && props.state
  const actions = props && props.actions

  const navigationPathMatch = Object.values(navigation).filter(
    (r) =>
      r.path == props.match.path &&
      r.navigation &&
      r.navigation.type &&
      r.navigation.type == 'makeTitle'
  )

  const navigationSubRoutes = Object.values(navigation)
    .filter((r) => r.routes && r.routes.length > 0)
    .find((r) => !!r.routes.find((route) => route.path === orginalUrl))

  const navigationSubRoutesMatch =
    navigationSubRoutes &&
    navigationSubRoutes.routes
      .map((el, i) => el)
      .filter((r) => r.path == url.join('/'))

  if (navigationPathMatch && navigationPathMatch.length > 0) {
    const { from, loadComponent, category } = navigationPathMatch[0].navigation
    let title = navigationPathMatch[0].navigation.title
    let backToTitle

    if (from !== null) {
      title = props.match.params[from].replace('-', ' ')
    }
    if (navigationPathMatch[0].navigation.backToTitle) {
      backToTitle = navigationPathMatch[0].navigation.backToTitle
    }

    return {
      leftSide: <BackTo {...url} title={backToTitle} themes={props.themes} />,
      navigation: (
        <SelectedNavLink
          title={title}
          load={loadComponent}
          category={category}
          swicthControl={state.swicthControl}
          swicthChange={actions.swicthChange}
        />
      ),
    }
  } else if (navigationSubRoutes) {
    return {
      leftSide: (
        <BackTo {...url} themes={props.themes} />
      ),
      navigation: (
        <SubNavigation {...navigationSubRoutes.routes} themes={props.themes} />
      ),
    }
  } else if (navigationSubRoutesMatch && navigationSubRoutesMatch.length > 0) {
    return {
      leftSide: <BackTo {...url} themes={props.themes} />,
      navigation: (
        <SelectedNavLink title={navigationSubRoutesMatch[0].navigation.title} />
      ),
    }
  } else if (url[1] == 'library' && url[2] && url[2].match(/(\d+)/gm)) {
    return {
      leftSide: <BackTo {...url} themes={props.themes} />,
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
  const { profile = {} } = props
  const { brand = {} } = profile
  const { profileImg } = brand
  const { textColor, moduleBackground, moduleShadow } = props.themes
  return (
    <header
      style={{
        color: textColor,
        background: moduleBackground,
        boxShadow: `0 2px 6px 0 ${moduleShadow}`,
      }}
    >
      <div className={containerClass}>
        {templateSelector['leftSide']}
        <div className={linksClass}>{templateSelector['navigation']}</div>
        <div className={profileClass}>
          <div className="float-right">
            <Dropdown profileImg={profileImg} />

            {/*<span>Bleacher Report</span>*/}
          </div>
        </div>
      </div>
    </header>
  )
}

/* eslint-disable react/prefer-stateless-function */
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swicthControl: false,
    }
  }

  swicthChange(category) {
    const {
      saveReportRequest,
      brandInsightValue: { data: brandInsightValue },
      comparebrandValues: { data: comparebrandValues },
      predefinedReportValues: { data: predefinedReportValues },
    } = this.props

    if (category === 'Brands Insights' && brandInsightValue) {
      saveReportRequest({
        ...brandInsightValue,
        category,
      })
    } else if (category === 'Compare Brands' && comparebrandValues) {
      saveReportRequest({
        ...comparebrandValues,
        category,
      })
    } else if (category === 'Predefined' && predefinedReportValues) {
      saveReportRequest({
        ...predefinedReportValues,
        category,
      })
    }

    this.setState({
      swicthControl: true,
    })
  }

  render() {
    return (
      <React.Fragment>
        <Template
          {...this.props}
          state={this.state}
          actions={{ swicthChange: this.swicthChange.bind(this) }}
          themes={this.props.themeContext.colors}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  libraryDetail: makeSelectLibraryDetail(),
  brandInsightValue: makeSelectReportsBrandInsightValues(),
  comparebrandValues: makeSelectReportsComparebrandValues(),
  predefinedReportValues: makeSelectReportsPredefinedReportValues(),
  profile: makeSelectAuthProfile(),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...reportsActions,
      ...generatedReportActions,
    },
    dispatch
  )

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  withTheme
)(Navbar)
