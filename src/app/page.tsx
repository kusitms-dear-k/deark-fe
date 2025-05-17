"use client";

import Landing from '@/components/landing/Landing';
import GATracker from '@/components/GATracker';
import Login from '@/components/authentication/Login'

export default function Home() {
  return (
    <>
      <GATracker />
      <Login />
    </>
  )
}
