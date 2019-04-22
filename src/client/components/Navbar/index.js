/**
 *
 * Navbar
 *
 */

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import DetailHeader from './DetailHeader'
import { makeSelectLibrary } from 'Reducers/library'

import style from './style.scss'
// import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const containerClass = classnames('bg-dark-grey-blue ' + style.container)
const linksClass = classnames(style.links)
const profileClass = classnames(style.profile)
const imageClass = classnames('circleImage ' + style.profileImage)


const BackTo = (props) => {
	let link, title = ""
	if(typeof(props) != "undefined" && props[1] != null){
		title = props[1]
		link = "/" + props[1]
	}
	else{
		title = "overview"
		link = "/"
	}
	return (<div className={style.backTo}>
		<Link to={link}>
			<span className="icon-Left-Arrow-Circle">
				<span className="path1" />
				<span className="path2" />
				<span className="path3" />
			</span>
			<span className={style.text}>Back to {capitalizeFirstLetter(title)}</span>
		</Link>
	</div>)
}

const Logo = () => (
	<div className={style.logo}>
    <Link to="/">Lumiere</Link>
  </div>
)

const Default = () => (<React.Fragment>
  <NavLink to="/panoptic" activeClassName={style.activeLink}>
    Panoptic
  </NavLink>
  <NavLink to="/audience" activeClassName={style.activeLink}>
    Audience
  </NavLink>
  <NavLink to="/library" activeClassName={style.activeLink}>
    Library
  </NavLink>
  <NavLink to="/marketview" activeClassName={style.activeLink}>
    Marketview
  </NavLink>
  <NavLink to="/quickview" activeClassName={style.activeLink}>
    QuickView
  </NavLink>
  <NavLink to="/reports" activeClassName={style.activeLink}>
    Reports
  </NavLink>
</React.Fragment>)

const SelectedNavLink = (props) => {
	return(<React.Fragment>{capitalizeFirstLetter(props[2])}</React.Fragment>)
}

const Marketview = () => (<React.Fragment>
  <NavLink
    to="/marketview/platform"
    className={style.tab}
    activeClassName={classnames(style.tab, style.activeLink)}
  >
    Platform
  </NavLink>
  <NavLink
    to="/marketview/competitor"
    className={style.tab}
    activeClassName={style.activeLink}
  >
    Competitor
  </NavLink>
  <NavLink
    to="/marketview/time"
    className={style.tab}
    activeClassName={style.activeLink}
  >
    Time
  </NavLink>
</React.Fragment>)

const VideoTitle = (props) => {

	const {
		match,
		library: { videos },
	} = props

	if(videos && match){
		console.log(videos)
		console.log(match)
		console.log(Object.values(match.params)[0])
		//const video = videos.find(({ id }) => id == Object.values(match.params)[0]) || {}
		//title = video.title
		//{capitalizeFirstLetter(title)}
		return (<div></div>)
	}
}

const Selector = (props) => {
	const url = props.match.url.split('/')

  switch (url[1]) {
    case ("marketview"):
			if(url[2]) {
				return {
					"leftSide": <BackTo {...url} />,
					"navigation": <SelectedNavLink {...url} />
				}
			}
      return {
				"leftSide": <BackTo />,
				"navigation": <Marketview />
			}
      break;
		case ("library"):
			if(url[2] && url[2].match(/(\d+)/gm)) {
				return {
					"leftSide": <BackTo {...url} />,
					"navigation": <VideoTitle {...props} />
				}
			}
			else {
				return {
					"leftSide": <Logo />,
					"navigation": <Default />
				}
			}
			break;
    default:
			return {
				"leftSide": <Logo />,
				"navigation": <Default />
			}
      break;
  }
}

const Template = (props) => {
	const templateSelector = Selector(props)

	return (
		<div className={containerClass}>
			{templateSelector["leftSide"]}
			<div className={linksClass}>
				{templateSelector["navigation"]}
			</div>
			<div className={profileClass}>
				<div className="float-right">
					<img src="https://picsum.photos/30" className={imageClass} />
					<span>Bleacher Report</span>
				</div>
			</div>
		</div>
	)
}

/* eslint-disable react/prefer-stateless-function */
class Navbar extends React.Component {
  detailStates(match, videos) {
    const basePath = match.path.split('/')[1]
    let title = null

    if (basePath === 'library') {
      const video =
        videos.find(({ id }) => id == Object.values(match.params)[0]) || {}
      title = video.title
    }

    return {
      basePath,
      title,
      url: '/' + basePath,
    }
  }

  render() {

    return (
      <React.Fragment>
        <Template {...this.props} />
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

export default compose(withConnect)(Navbar)
