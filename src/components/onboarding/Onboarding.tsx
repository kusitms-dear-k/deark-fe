import { useState } from 'react'

import OnboardingStep1 from '@/components/onboarding/OnboardingStep1'
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2'
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3'
import OnboardingStep4 from '@/components/onboarding/OnboardingStep4'
import { useRouter } from 'next/navigation'

interface OnboardingProps {
  onSkip: () => void
}

const Onboarding = ({ onSkip }: OnboardingProps) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  return (
    <main className="min-h-screen bg-bg-100">
      {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} onSkip={onSkip} />}
      {step === 2 && <OnboardingStep2 onNext={() => setStep(3)} onSkip={onSkip} />}
      {step === 3 && <OnboardingStep3 onNext={() => setStep(4)} onSkip={onSkip} />}
      {step === 4 && <OnboardingStep4 onNext={onSkip} onSkip={() => router.push('/login')} />}
    </main>
  )
}
export default Onboarding
