import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useState } from 'react'

import OnboardingStep1 from '@/components/onboarding/OnboardingStep1'
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2'
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3'
import OnboardingStep4 from '@/components/onboarding/OnboardingStep4'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'

interface OnboardingProps {
  onSkip: () => void
}

const Onboarding = ({ onSkip }: OnboardingProps) => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  return (
    <Carousel
      className="relative" // relative로 기준 생성
      showThumbs={false}
      showStatus={false}
      emulateTouch
      swipeable
      showArrows={false}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        const indicatorClasses = `inline-block mx-[2px] rounded-full transition-all duration-200 ${
          isSelected ? 'w-[30px] h-[8px] bg-blue-400' : 'w-[8px] h-[8px] bg-gray-200'
        }`
        return (
          <button key={index} onClick={onClickHandler} className={indicatorClasses} aria-label={`Slide ${index}`} />
        )
      }}
    >
      <div className="bg-bg-100 flex w-full items-center justify-center">
        <OnboardingStep1 onNext={() => {}} onSkip={onSkip} />
      </div>
      <div className="bg-bg-100 flex w-full items-center justify-center">
        <OnboardingStep2 onNext={() => {}} onSkip={onSkip} />
      </div>
      <div className="bg-bg-100 flex !h-screen items-center justify-center">
        <OnboardingStep3 onNext={() => {}} onSkip={onSkip} />
      </div>
      <div className="bg-bg-100 flex !h-screen items-center justify-center">
        <OnboardingStep4 onNext={onSkip} onSkip={() => router.push('/login')} />
      </div>
    </Carousel>
  )
}
export default Onboarding
