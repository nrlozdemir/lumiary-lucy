import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import isArray from 'lodash/isArray'

import style from './styles.scss'
import { ucfirst } from 'Utils'

const NavBar = (props) => {
  const { items, handleClick, selected, cta, baseUrl, className, handleBackButton, type, editMode } = props
  const classNames = cx(style.signupTopbar, className, {
    [style.secondary]: type === 'secondary'
  })

  return (
    <div className={classNames}>
      <div className={ style.leftnav } onClick={ handleBackButton }>
        <span>Exit</span> 
      </div>

      <nav className={ style.topBar } role="navigation">
        <div className={ style.navlist }>
          {type === 'secondary' && isArray(items) ? (
            items.map((item, index) => {
              const classNames = cx(
                {[style.complete]: item.hasCompleted || editMode },
                {[style.selected]: selected == item.key }
              );

              return (
                <Link
									className={classNames}
									key={item.key}
									onClick={() => handleClick(item, index)}
                  to={`${baseUrl}/${item.key}`}
                  >
									<span>
                    {item.name}
                  </span>
                </Link>
              );
            })
          ) : (
            Object.keys(items).map((key, idx) => {
              const classNames = cx(
                {[style.complete]: items[key] || editMode},
                {[style.selected]: selected == key }
              )

              const label = ucfirst(key)

              return key != 'undefined' &&
							<Link
								className={ classNames }
								key={ idx }
								onClick={ ( ) => handleClick(key) }
								to={ `${baseUrl}/${key}` }
							><span>{ label }</span>
              </Link>
            })
          )}

        </div>
      </nav>
    </div>
  )
}

export default NavBar
