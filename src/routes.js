import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './pages/index'
import AdminPage from './pages/admin'
import LoginPage from './pages/login'
import Session from './components/session'
import ROLES from './common/roles'
import { history } from './components/history'

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const userData = Session.getUserData()
  const isLoggedIn = !!userData
  const role = userData ? userData.role : null

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          allowedRoles.indexOf(role) > -1 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LoginPage} />
      <PrivateRoute
        path="/admin"
        exact
        component={AdminPage}
        allowedRoles={[ROLES.ADMIN]}
      />
      <PrivateRoute
        path="/user"
        exact
        component={AdminPage}
        allowedRoles={[ROLES.USER, ROLES.ADMIN]}
      />
    </Switch>
  </Router>,
  document.getElementById('root')
)
