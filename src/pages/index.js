import React from 'react'
import { Link } from 'react-router-dom'
import Api from 'easy-fetch-api'
import AppWrapper from '../containers/app-wrapper'

const IndexPage = () => {
  return (
    <AppWrapper>
      <div className="heading">This is a heading</div>
      <div style={{ marginTop: '30px' }}>
        App Routes
        <ul>
          <li>
            Accessing <Link to="/user">the user page</Link> should not work
            unless you're logged in.
          </li>
          <li>
            Accessing <Link to="/admin">the admin dashboard</Link> should not
            work unless you're logged in as an Admin.
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '30px' }}>
        API Routes (check network tab):
        <ul>
          <li>
            <span
              className="fake-link"
              onClick={getUrl.bind(null, '/api/test')}
            >
              Test API route
            </span>{' '}
            should work
          </li>
          <li>
            <span
              className="fake-link"
              onClick={getUrl.bind(null, '/api/authenticated-only')}
            >
              Auth API route
            </span>{' '}
            should work only if you're authenticated
          </li>
          <li>
            <span
              className="fake-link"
              onClick={getUrl.bind(null, '/api/admin-only')}
            >
              Admin API route
            </span>{' '}
            should work only if you're authenticated & an admin
          </li>
        </ul>
      </div>
    </AppWrapper>
  )
}

const getUrl = (url) => Api.get({ url })

export default IndexPage
