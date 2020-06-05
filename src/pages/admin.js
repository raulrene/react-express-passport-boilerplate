import React from 'react'
import AppWrapper from '../containers/app-wrapper'

const AdminDashboard = () => {
  return (
    <AppWrapper>
      <div className="heading">
        This page is private. If you are here it means you are authorized.
      </div>
      You can navigate back to the landing page clicking on the app logo.
    </AppWrapper>
  )
}

export default AdminDashboard
