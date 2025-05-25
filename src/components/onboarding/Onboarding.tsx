import { useState } from 'react'

import OnboardingStep1 from '@/components/onboarding/OnboardingStep1'
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2'
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3'
import OnboardingStep4 from '@/components/onboarding/OnboardingStep4'

interface OnboardingProps {
  onNext: () => void
}

const Onboarding = ({ onNext }: OnboardingProps) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  return (
    <main>
      {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} />}
      {step === 2 && <OnboardingStep2 onPrev={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <OnboardingStep3 onPrev={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <OnboardingStep4 onPrev={() => setStep(3)} onNext={onNext} />}
    </main>
  )
}
export default Onboarding
