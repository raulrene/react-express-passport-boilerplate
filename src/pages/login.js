import React, { useState } from 'react'
import Api from 'easy-fetch-api'
import { history, getPrevLocation } from '../components/history'
import AppWrapper from '../containers/app-wrapper'
import Button from '../components/button'
import Input from '../components/input'
import Session from '../components/session'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setError(null)

    Api.post({
      url: '/api/login',
      data: { email, password },
    }).then((res) => {
      if (!res.success || res.error || !res.user) {
        return setError(res.error || 'Invalid credentials')
      }

      Session.setUserData(res.user)
      history.push(getPrevLocation())
    })
  }

  return (
    <AppWrapper>
      <div className="heading">Log In</div>
      <form className="form" onSubmit={handleSubmit}>
        <Input type="text" value={email} onChange={setEmail} label={'Email'} />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          label={'Password'}
        />

        {error && <div className="error">{error}</div>}

        <Button
          className="form__button"
          value="Log in"
          onClick={handleSubmit}
        />
      </form>
    </AppWrapper>
  )
}

export default LoginPage
