import React from "react"
import { Link } from "react-router"
import PropTypes from 'prop-types'
import style from "./styles.scss"
import { ucfirst } from "../../utils"

const NavBar = props => {
  const { items, handleClick, baseUrl } = props

  return (
    <div>
      <nav className={style.navigation} role="navigation">
        <div className={style.navlist}>
          { items.length && items.map((key, idx) => {
            const label = ucfirst(key);
            return (
              key != "undefined" && (
                <Link
                  className={style.linkElement}
                  key={idx}
                  onClick={() => handleClick(key)}
                  to={`/${key}`}
                >
                  <span>{label}</span>
                </Link>
              )
            );
          })}
        </div>
      </nav>
    </div>
  )
}



export default NavBar
