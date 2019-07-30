import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import classnames from 'classnames'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { createBrowserHistory } from 'history'

import { makeSelectLibraryDetail } from 'Reducers/libraryDetail'

import {
  actions as reportsActions,
  makeSelectReportsBrandInsightValues,
  makeSelectReportsComparebrandValues,
  makeSelectReportsPredefinedReportValues,
  makeSelectCreatedReportControl,
} from 'Reducers/reports'

import { actions as generatedReportActions } from 'Reducers/generatedReport'
import { actions as authActions } from 'Reducers/auth'

import { makeSelectAuthProfile } from 'Reducers/auth'

import Switch from 'Components/Form/Switch'
import { ucfirst, getLocationParams } from 'Utils'
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
    title = 'Back To ' + ucfirst(props[1])
    link = '/' + props[1]
  } else {
    title = 'Back To Overview'
    link = '/'
  }

  if (props && props.title) {
    title = ucfirst(props.title)
  }

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

export const NavLinkComponent = (props) => {
  const { forceActiveChildren, ...rest } = props
  return (
    <NavLink
      {...rest}
      isActive={(match, location) => {
        if (forceActiveChildren && forceActiveChildren === rest.children) {
          return true
        }
        if (rest.to === location.pathname) {
          return true
        }
        if (location.pathname === '/' && rest.to === '/library') {
          return true
        }
        return false
      }}
    />
  )
}

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
    .map((el, i) => {
      return (
        <NavLinkComponent
          key={i}
          to={el.path}
          activeClassName={style.activeLink}
          style={{ color: textColor }}
          forceActiveChildren={props.forceActiveChildren}
        >
          {el.navigation.title}
        </NavLinkComponent>
      )
    })
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
            switchOn={props.switchControl}
            controlSwitch={() => props.switchChange(props.category)}
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
  if (selectedVideo) {
    return <div className={style.headerTitle}>Library</div>
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

  if (orginalUrl.includes('/glossary')) {
    let routesForGlossary = [
      {
        name: 'Properties',
        url: '/glossary/p/properties',
      },
      {
        name: 'Formats',
        url: '/glossary/f/formats',
      },
      {
        name: 'Pages',
        url: '/glossary/p/pages',
      },
    ]
    const LinksForGlossary = (props) => {
      const { textColor, moduleBackground, moduleBorder } = props.themes
      return routesForGlossary.map((el, i) => (
        <NavLink
          key={i}
          to={el.url}
          style={{ color: textColor, borderColor: `${moduleBorder}` }}
          activeClassName={classnames(style.tab, style.activeLink)}
        >
          {el.name}
        </NavLink>
      ))
    }

    const { profile = {} } = props
    const { brand = {} } = profile
    const { avatar } = brand
    return {
      removeDropdown: true,
      leftSide: <Logo themes={props.themes} />,
      navigation: (
        <div className={style.glossaryHeader}>
          <div
            className={style.headerTitle}
            style={{ color: props.themes.textColor }}
          >
            Glossary
          </div>
          <div className={style.glossaryLinks}>
            <div className={style.glossaryBorder}>
              <LinksForGlossary themes={props.themes} />
            </div>
            <div className={profileClass}>
              <div className="float-right">
                <Dropdown avatar={avatar} />
              </div>
            </div>
          </div>
        </div>
      ),
    }
  }

  const navigationForcePathMatch = Object.values(navigation).filter(
    (r) =>
      r.path == props.match.path &&
      r.navigation &&
      r.navigation.type &&
      r.navigation.type == 'dynamicActive'
  )

  if (navigationForcePathMatch && navigationForcePathMatch.length) {
    return {
      leftSide: <Logo themes={props.themes} />,
      navigation: (
        <Default
          {...navigation}
          forceActiveChildren={navigationForcePathMatch[0].component}
          themes={props.themes}
        />
      ),
    }
  }

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

    backToTitle =
      !!navigationPathMatch[0].navigation.backToTitle &&
      navigationPathMatch[0].navigation.backToTitle
    return {
      leftSide: <BackTo {...url} title={backToTitle} themes={props.themes} />,
      navigation: (
        <SelectedNavLink
          title={title}
          load={loadComponent}
          category={category}
          switchControl={state.switchControl}
          switchChange={actions.switchChange}
        />
      ),
    }
  } else if (navigationSubRoutes) {
    let backToTitle
    backToTitle =
      !!navigationSubRoutes.backToTitle && navigationSubRoutes.backToTitle

    return {
      leftSide: <BackTo {...url} title={backToTitle} themes={props.themes} />,
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
      leftSide: (
        <BackTo {...url} title="Back To Overview" themes={props.themes} />
      ),
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
  const navigation = props && props.routeConfig
  if (
    Object.values(navigation).find(
      (r) => r.path == props.match.path && r.navbarOff
    )
  ) {
    return null
  }
  const templateSelector = Selector(props)
  const { profile = {}, logoutRequest } = props
  const { brand = {} } = profile
  const { avatar } = brand
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
            <Dropdown avatar={avatar} logout={logoutRequest} />

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
    const {
      location: { search },
    } = props
    const urlParams = getLocationParams(search)
    this.state = {
      switchControl: !!urlParams && urlParams.saved === 'true',
    }
  }

  switchChange(category) {
    const {
      saveReportRequest,
      loadDeleteReport,
      brandInsightValue: { data: brandInsightValue },
      comparebrandValues: { data: comparebrandValues },
      createdReportControls: { uuid, isSaved },
      predefinedReportValues: { data: predefinedReportValues },
      push,
      location: { search },
    } = this.props
    const urlParams = getLocationParams(search)

    if (category === 'Brands Insights' && brandInsightValue) {
      this.setState(
        {
          switchControl: !isSaved,
        },
        () => {
          const { date, engagement, title, social, brand } = urlParams
          window.history.pushState(
            '',
            '',
            `/reports/brand-insight?date=${date}&engagement=${engagement}&title=${title}&social=${social}&brand=${brand}&saved=${!isSaved}`
          )
        }
      )
      if (isSaved) {
        return loadDeleteReport(uuid)
      }
      saveReportRequest({
        ...brandInsightValue,
        category,
      })
    } else if (category === 'Compare Brands' && comparebrandValues) {
      this.setState(
        {
          switchControl: !isSaved,
        },
        () => {
          const { title, brand_one_uuid, brand_two_uuid } = urlParams
          window.history.pushState(
            '',
            '',
            `/reports/compare-brands?title=${title}&brand_one_uuid=${brand_one_uuid}&brand_two_uuid=${brand_two_uuid}&saved=${!isSaved}`
          )
        }
      )
      if (isSaved) {
        return loadDeleteReport(uuid)
      }
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
  }

  componentDidUpdate() {
    const {
      createdReportControls: { uuid },
      location: { search, pathname },
    } = this.props
    const urlParams = getLocationParams(search)
    const {
      title,
      brand_one_uuid,
      brand_two_uuid,
      date,
      engagement,
      social,
      brand,
      saved,
    } = urlParams
    const { switchControl } = this.state
    if (uuid) {
      if (pathname === '/reports/brand-insight') {
        window.history.pushState(
          '',
          '',
          `/reports/brand-insight?date=${date}&engagement=${engagement}&title=${title}&social=${social}&brand=${brand}&saved=${switchControl}&report_uuid=${uuid}`
        )
      } else if (pathname === '/reports/compare-brands') {
        window.history.pushState(
          '',
          '',
          `/reports/compare-brands?title=${title}&brand_one_uuid=${brand_one_uuid}&brand_two_uuid=${brand_two_uuid}&saved=${switchControl}&report_uuid=${uuid}`
        )
      }
    }
  }

  componentDidMount() {
    const {
      createdReportControls: { uuid },
      location: { search },
    } = this.props
    const urlParams = getLocationParams(search)
    const { report_uuid } = urlParams
    if (!uuid && report_uuid) {
      this.props.createdReportControl({
        isSaved: !!urlParams && urlParams.saved === 'true',
        uuid: report_uuid,
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Template
          {...this.props}
          state={this.state}
          actions={{ switchChange: this.switchChange.bind(this) }}
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
  createdReportControls: makeSelectCreatedReportControl(),
  profile: makeSelectAuthProfile(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    push: (url) => dispatch(push(url)),
    ...bindActionCreators(
      {
        ...reportsActions,
        ...generatedReportActions,
        ...authActions,
      },
      dispatch
    ),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

const composedComponent = compose(
  withConnect,
  withTheme
)(Navbar)

export default withRouter(composedComponent)
