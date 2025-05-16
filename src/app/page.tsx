'use client'

import LandingPage from '@/components/landing/LandingPage'
import GATracker from '@/components/GATracker'
import Login from '@/components/authentication/Login'

export default function Home() {
  return (
    <>
      <GATracker />
      <Login />
      {/*<LandingPage />*/}
    </>
  )
}
