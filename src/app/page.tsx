"use client";

import GATracker from '@/components/GATracker';
import HomePage from '@/components/home/HomePage'
import { useState } from 'react'
import Onboarding from '@/components/onboarding/Onboarding'

export default function Home() {
  const [step, setStep] = useState<'Onboarding' | 'Home'>('Onboarding')
  return (
    <>
      <GATracker />
      {step === 'Onboarding' && <Onboarding onSkip={() => setStep('Home')} />}
      {step === 'Home' && <HomePage />}
    </>
  )
}
