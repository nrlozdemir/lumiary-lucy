import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet';
//import Script from 'react-load-script'
import style from 'Components/Layout/styles.scss'
import { Footer, Header } from 'Components/Layout'

const Layout = ({ children, header, main, location: { pathname } }) => (
  <div className="layout">
    <Helmet>
			<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    </Helmet>

    { pathname.match(/(signup|project(\/custom|\/menu))/) ? null :
      <Header />
    }

    { children }
    { main }

    { pathname.match(/(signup|project(\/custom|\/menu))/) ? null :
    	<Footer />
    }
  </div>
)

Layout.propTypes = {
  children: PropTypes.object
}

export default Layout
