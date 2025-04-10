"use client";

import LandingPage from '@/components/landing/LandingPage';
import GATracker from '@/components/GATracker';

export default function Home() {
  return (
    <>
      <GATracker />
      <LandingPage />
    </>
  )
}
