import React from 'react'
import { history } from '../history'
import Session from '../session'
import './style.scss'

const Header = () => {
  const user = Session.getUserData()

  const logout = () => {
    Session.logout()
    history.push('/')
  }

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={() => {
          history.push('/')
        }}
      >
        { '<<APP_NAME>>' }
      </div>

      {!!user ? (
        <div className="header__user">
          <div>Welcome {user.name}</div>
          <div className="fake-link" onClick={logout}>
            Log out
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
