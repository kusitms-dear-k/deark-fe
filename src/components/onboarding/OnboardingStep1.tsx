import BottomStepperControls from '@/components/onboarding/BottomStepperControls'
import { useRouter } from 'next/navigation'

interface OnboardingStep1Props {
  onNext: () => void
  onSkip: () => void
}

const OnboardingStep1 = ({ onSkip, onNext }: OnboardingStep1Props) => {
  const router = useRouter()
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5">
      <BottomStepperControls
        step={1}
        title={'내게 꼭 필요한 검색 필터'}
        content1={'유연한 검색과 맞춤형 필터로'}
        content2={'원하는 가게와 디자인을 쉽게 찾아보세요.'}
        onNext={onNext}
        onSkip={onSkip}
      />
    </main>
  )
}
export default OnboardingStep1
