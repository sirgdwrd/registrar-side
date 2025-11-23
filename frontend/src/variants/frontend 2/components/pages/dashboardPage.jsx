import React from 'react'
import Welcome from '../common/dashboard/welcome'
import Status from '../common/dashboard/status'
import Notifications from '../common/dashboard/notifications'


const dashboardPage = () => {
  return (
    <>
            <Welcome/>
            <Status/>
            <Notifications/>
    </>
  )
}

export default dashboardPage